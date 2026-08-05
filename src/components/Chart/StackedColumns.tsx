import {ChartRow, ChartSeries} from "@/components/Chart/chartData";

/**
 * Composition over time: one column per time bucket, each summing to 100%.
 * Plain CSS rather than recharts - a stack needs a 2px surface gap between
 * segments, and recharts can only fake that with a stroke, which adds ink.
 */
export default function StackedColumns({buckets, series, height = 'h-18'}: {
    buckets: ChartRow[]
    series: ChartSeries[]
    height?: string
}) {
    if (!buckets.length || !series.length) return null

    return (
        <div className={`flex items-end gap-0.5 w-full ${height}`}>
            {buckets.map(bucket => {
                const total = series.reduce((sum, s) => sum + (bucket[s.key] ?? 0), 0)
                if (!total) return null

                return (
                    // Bottom-up: the first series sits on the baseline, so at least one
                    // segment always reads against a fixed edge.
                    <div key={bucket.t} className='flex flex-col-reverse gap-0.5 h-full flex-1 min-w-0'>
                        {series.map((s, i) => {
                            const value = bucket[s.key] ?? 0
                            if (!value) return null

                            return (
                                <div
                                    key={s.key}
                                    title={`${s.key} ${value}%`}
                                    className={i === series.length - 1 ? 'rounded-t-[4px]' : ''}
                                    style={{flex: `${value} 1 0%`, background: s.color}}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}
