import {MarketOutcome, MarketPriceHistory} from "@/types/types";

// Categorical slots, stepped for the dark chart surface (#1c1d22).
// Validated as a set: worst adjacent CVD dE 8.4, normal-vision dE 19.3, all >= 3:1 contrast.
// Assigned by outcome order, never by price rank - a leader change must not repaint the chart.
const SERIES_COLORS = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181']
const OTHER_COLOR = '#898781'
const OTHER_KEY = 'Other'

export interface ChartSeries {
    key: string
    color: string
    current: number
}

export interface ChartRow {
    t: number
    [series: string]: number
}

export interface ChartData {
    rows: ChartRow[]
    series: ChartSeries[]
    /** outcome id to its series colour, so other views can key off the same hue */
    colors: Map<string, string>
}

const EMPTY: ChartData = {rows: [], series: [], colors: new Map()}

const toPct = (price: number) => Math.round(price * 1000) / 10

export function buildChartData(
    history: MarketPriceHistory[] | undefined,
    outcomes: MarketOutcome[] | undefined,
): ChartData {
    if (!history?.length || !outcomes?.length) return EMPTY

    // Only the tail beyond the palette is folded into "Other", picked by volume.
    const tail = new Set(
        [...outcomes]
            .sort((a, b) => b.volume - a.volume)
            .slice(SERIES_COLORS.length)
            .map(o => o.id)
    )

    const keyByOutcome = new Map<string, string>()
    const colors = new Map<string, string>()
    const series: ChartSeries[] = []
    const taken = new Set<string>()
    let otherCurrent = 0

    outcomes.forEach(outcome => {
        if (tail.has(outcome.id)) {
            keyByOutcome.set(outcome.id, OTHER_KEY)
            colors.set(outcome.id, OTHER_COLOR)
            otherCurrent += toPct(outcome.price)
            return
        }
        // Labels come from the API and are not guaranteed unique, but dataKeys must be.
        let key = outcome.label
        for (let i = 2; taken.has(key); i++) key = `${outcome.label} (${i})`
        taken.add(key)

        const color = SERIES_COLORS[series.length]
        keyByOutcome.set(outcome.id, key)
        colors.set(outcome.id, color)
        series.push({key, color, current: toPct(outcome.price)})
    })

    if (tail.size) series.push({key: OTHER_KEY, color: OTHER_COLOR, current: Math.round(otherCurrent * 10) / 10})

    // Recharts wants one row per x with a key per series; the API is series-major.
    const byTime = new Map<number, ChartRow>()

    for (const outcomeHistory of history) {
        const key = keyByOutcome.get(outcomeHistory.outcome_id)
        if (!key) continue // history for an outcome the market no longer lists

        for (const point of outcomeHistory.points) {
            const ms = new Date(point.recorded_at).getTime()
            if (Number.isNaN(ms)) continue
            // Outcomes are snapshotted together but recorded microseconds apart -
            // an exact timestamp key would leave one series per row and break every line.
            const t = Math.round(ms / 1000) * 1000

            const row = byTime.get(t) ?? {t}
            row[key] = key === OTHER_KEY ? (row[key] ?? 0) + toPct(point.price) : toPct(point.price)
            byTime.set(t, row)
        }
    }

    return {
        rows: [...byTime.values()].sort((a, b) => a.t - b.t),
        series,
        colors,
    }
}

const HOUR = 60 * 60 * 1000

export const RANGES = [
    {label: '1H', ms: HOUR},
    {label: '6H', ms: 6 * HOUR},
    {label: '1D', ms: 24 * HOUR},
    {label: '1W', ms: 7 * 24 * HOUR},
    {label: 'ALL', ms: Infinity},
] as const

export type RangeLabel = typeof RANGES[number]['label']

/** Windowed from the newest point rather than `Date.now()`, so a stale feed still renders. */
export function sliceRange(rows: ChartRow[], ms: number): ChartRow[] {
    if (!rows.length || ms === Infinity) return rows
    const from = rows[rows.length - 1].t - ms
    const start = rows.findIndex(row => row.t >= from)
    return start <= 0 ? rows : rows.slice(start)
}

/** ~2 points per pixel is invisible detail that still costs a path node. Keeps both ends. */
export function downsample(rows: ChartRow[], max = 180): ChartRow[] {
    if (rows.length <= max) return rows
    const step = (rows.length - 1) / (max - 1)
    return Array.from({length: max}, (_, i) => rows[Math.round(i * step)])
}

/**
 * Collapses rows into `count` equal time windows for a column chart.
 * A price is a state, not a quantity - the bucket takes the last reading in its
 * window, never a sum, so every column still adds up to 100%.
 * Empty windows are dropped rather than drawn as gaps.
 */
export function bucketRows(rows: ChartRow[], count = 16): ChartRow[] {
    if (rows.length <= count) return rows

    const from = rows[0].t
    const span = rows[rows.length - 1].t - from
    if (span <= 0) return rows.slice(-1)

    const last = new Map<number, ChartRow>()
    for (const row of rows) {
        // The final row would land in its own bucket past the end; clamp it into the last one.
        const slot = Math.min(Math.floor(((row.t - from) / span) * count), count - 1)
        last.set(slot, row)
    }

    return [...last.entries()].sort((a, b) => a[0] - b[0]).map(([, row]) => row)
}
