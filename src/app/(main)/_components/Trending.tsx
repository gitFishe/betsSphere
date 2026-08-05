'use client'

import Link from "next/link";
import {ReactNode, useMemo} from "react";
import {skipToken} from "@reduxjs/toolkit/query";
import {useGetFeaturedMarketQuery, useGetMarketPriceHistoryQuery} from "@/api/marketsApi";
import StackedColumns from "@/components/Chart/StackedColumns";
import {buildChartData, bucketRows} from "@/components/Chart/chartData";

function TrendingShell({title, children}: {title: string, children: ReactNode}) {
    return (
        <div className='shrink-0 shadow-component border-2 border-border-default bg-component rounded-3xl relative pt-20 p-3'>
            <div className='flex items-center h-15 text-2xl font-semibold w-full border-2 border-border-default px-5 shadow-component rounded-3xl absolute top-0 left-0'>
                <h2 className='truncate min-w-0'>{title}</h2>
            </div>
            {children}
        </div>
    )
}

export default function Trending() {
    const {data: market, isLoading, error} = useGetFeaturedMarketQuery()
    const {data: history} = useGetMarketPriceHistoryQuery(market?.id ?? skipToken)

    const {rows, series} = useMemo(
        () => buildChartData(history, market?.outcomes),
        [history, market],
    )

    // 16 columns is what fits a 400px card at a readable width.
    const buckets = useMemo(() => bucketRows(rows, 16), [rows])

    // Same height as the loaded card, so nothing jumps when data lands.
    if (isLoading) return <TrendingShell title='Trending'><div className='h-31'/></TrendingShell>
    if (error || !market) {
        return (
            <TrendingShell title='Trending'>
                <div className='h-31 flex items-center justify-center text-text-dark text-sm'>
                    Nothing trending right now
                </div>
            </TrendingShell>
        )
    }

    return (
        <TrendingShell title={`Trending: ${market.title}`}>
            <Link href={`/market/${market.id}`} className='flex flex-col gap-3 px-2 pb-1'>
                {/* Composition over time: every column is 100%, so who leads and how
                    that shifted read off the same mark. */}
                <StackedColumns buckets={buckets} series={series}/>

                {/* Identity never rides on colour alone - every series is named and valued. */}
                <div className='flex flex-wrap gap-x-4 gap-y-1'>
                    {series.map(s => (
                        <div key={s.key} className='flex items-center gap-2 text-xs'>
                            <span className='w-3 h-0.5 rounded-full shrink-0' style={{background: s.color}}/>
                            <span className='text-text-dark truncate'>{s.key}</span>
                            <span className='text-text font-semibold tabular-nums'>{s.current}%</span>
                        </div>
                    ))}
                </div>
            </Link>
        </TrendingShell>
    )
}
