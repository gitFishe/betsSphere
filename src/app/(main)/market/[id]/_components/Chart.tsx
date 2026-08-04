'use client'
import {LineChart, Line, YAxis, XAxis, ReferenceLine, Tooltip, ResponsiveContainer, TooltipContentProps} from 'recharts'
import {ChartRow, ChartSeries} from "@/app/(main)/market/[id]/_components/chartData";

const GRID = '#414149'
const TICK = '#9898A0'
const SURFACE = '#1c1d22'

const timeLabel = (t: number) =>
    new Date(t).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})

const dateLabel = (t: number) =>
    new Date(t).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})

function ChartTooltip({active, payload, label}: TooltipContentProps) {
    if (!active || !payload?.length) return null

    return (
        <div className='bg-element border border-light-border rounded-lg px-3 py-2 shadow-lg'>
            <div className='flex flex-col gap-1'>
                {[...payload]
                    .sort((a, b) => Number(b.value) - Number(a.value))
                    .map(item => (
                        <div key={String(item.dataKey)} className='flex items-center gap-2'>
                            <span className='w-2.5 h-0.5 rounded-full shrink-0' style={{background: item.color}}/>
                            <span className='text-text font-semibold tabular-nums'>{item.value}%</span>
                            <span className='text-text-dark truncate'>{String(item.dataKey)}</span>
                        </div>
                    ))}
            </div>
            <div className='text-text-dark text-xs mt-1.5 pt-1.5 border-t border-light-border'>
                {typeof label === 'number' ? `${dateLabel(label)}, ${timeLabel(label)}` : null}
            </div>
        </div>
    )
}

export default function Chart({data, series}: {data: ChartRow[], series: ChartSeries[]}) {
    if (!data.length) {
        return (
            <div className='h-[280px] flex items-center justify-center rounded-2xl border-3 border-border-default shadow-component text-text-dark text-sm'>
                No price history yet
            </div>
        )
    }

    // Ticks read as clock time inside a day and as dates once the window is wider.
    const spansDays = data[data.length - 1].t - data[0].t > 24 * 60 * 60 * 1000
    const formatTick = spansDays ? dateLabel : timeLabel

    return (
        <ResponsiveContainer width='100%' height={280}
                             className='p-4 rounded-2xl border-3 border-border-default shadow-component'>
            <LineChart data={data} margin={{top: 10, right: 8, bottom: 0, left: 0}}>
                <YAxis
                    domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} width={40}
                    tickLine={false} axisLine={false}
                    tick={{fill: TICK, fontSize: 12}} tickFormatter={v => `${v}%`}
                />
                {/* type='number' + scale='time': on the default category scale recharts would
                    space the points evenly and misstate how fast the price actually moved. */}
                <XAxis
                    dataKey='t' type='number' scale='time' domain={['dataMin', 'dataMax']}
                    tickLine={false} axisLine={false}
                    tick={{fill: TICK, fontSize: 12}} tickFormatter={formatTick}
                />

                {[25, 50, 75].map(y => (
                    <ReferenceLine key={y} y={y} stroke={GRID} strokeDasharray='3 3'/>
                ))}

                {series.map(s => (
                    <Line
                        key={s.key} type='monotone' dataKey={s.key}
                        stroke={s.color} strokeWidth={2}
                        dot={false} activeDot={{r: 4, strokeWidth: 2, stroke: SURFACE}}
                        connectNulls isAnimationActive={false}
                    />
                ))}

                <Tooltip content={ChartTooltip} cursor={{stroke: GRID}}/>
            </LineChart>
        </ResponsiveContainer>
    )
}
