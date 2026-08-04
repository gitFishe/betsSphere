'use client'
import {useMemo, useState} from "react";
import Chart from "@/app/(main)/market/[id]/_components/Chart";
import {ChartData, downsample, RANGES, RangeLabel, sliceRange} from "@/app/(main)/market/[id]/_components/chartData";

const MIN_POINTS = 2

export default function ChartPanel({rows, series}: ChartData) {
    const [range, setRange] = useState<RangeLabel>('ALL')

    const {visible, enabled} = useMemo(() => {
        const sliced = new Map(RANGES.map(r => [r.label, sliceRange(rows, r.ms)]))
        // Sampling is irregular and can leave hour-long holes, so a short preset
        // is offered only when it actually contains a line to draw.
        const enabled = new Set(
            RANGES.filter(r => (sliced.get(r.label)?.length ?? 0) >= MIN_POINTS).map(r => r.label)
        )
        const active = enabled.has(range) ? range : 'ALL'
        return {visible: downsample(sliced.get(active) ?? rows), enabled}
    }, [rows, range])

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between gap-4 flex-wrap'>
                {/* Identity never rides on colour alone: every series is named and valued here. */}
                <div className='flex flex-wrap gap-x-5 gap-y-1'>
                    {series.map(s => (
                        <div key={s.key} className='flex items-center gap-2 text-sm'>
                            <span className='w-3 h-0.5 rounded-full shrink-0' style={{background: s.color}}/>
                            <span className='text-text-dark'>{s.key}</span>
                            <span className='text-text font-semibold tabular-nums'>{s.current}%</span>
                        </div>
                    ))}
                </div>

                <div className='flex gap-1 ml-auto'>
                    {RANGES.map(r => (
                        <button
                            key={r.label} type='button'
                            onClick={() => setRange(r.label)}
                            disabled={!enabled.has(r.label)}
                            aria-pressed={range === r.label}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                                range === r.label && enabled.has(r.label)
                                    ? 'bg-element text-text'
                                    : 'text-text-dark hover:text-text disabled:opacity-40 disabled:hover:text-text-dark disabled:cursor-not-allowed'
                            }`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>
            </div>

            <Chart data={visible} series={series}/>
        </div>
    )
}
