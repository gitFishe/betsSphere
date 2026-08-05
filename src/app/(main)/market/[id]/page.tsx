'use client'

import {use, useEffect, useMemo, useRef} from "react";
import TradePanel from "@/app/(main)/market/[id]/_components/TradePanel";
import Index from "@/app/(main)/market/[id]/_components/Outcome";
import ChartPanel from "@/app/(main)/market/[id]/_components/Chart/ChartPanel";
import {buildChartData} from "@/components/Chart/chartData";
import TabsComponent from "@/components/TabsComponent";
import CommentsTab from "@/components/TabsComponent/CommentsTab";
import {formatMonthYear} from "@/utils/date";
import {formatUsd} from "@/utils/format";
import {useGetMarketPriceHistoryQuery, useGetMarketQuery} from "@/api/marketsApi";
import useChatSocket from "@/hooks/useChatSocket";

function StatusBox({children}: {children: React.ReactNode}) {
    return (
        <div className='h-full flex items-center justify-center text-text-dark'>
            {children}
        </div>
    )
}

export default function MarketPage({params}: {params: Promise<{id: string}>}) {
    const {id} = use(params)
    const {data: market, isLoading, error} = useGetMarketQuery(id)
    const {data: history, error: historyError} = useGetMarketPriceHistoryQuery(id)

    const chart = useMemo(() => buildChartData(history, market?.outcomes), [history, market])

    const {messages} = useChatSocket()

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (isLoading) return <StatusBox>Loading market…</StatusBox>
    if (error || !market) return <StatusBox>Could not load this market.</StatusBox>

    return (
        <div className='flex h-full gap-10'>
            <div className='relative w-full h-full overflow-y-auto no-scrollbar flex flex-col gap-6 rounded-2xl'>
                <div className='flex items-center gap-4 sticky top-0 left-0 bg-component z-100 p-3 rounded-2xl border-3 border-border-default shadow-component'>
                    <div className='w-15 h-15 bg-white rounded-2xl'></div>
                    <div>
                        <h1 className='text-2xl text-text font-bold'>{market.title}</h1>
                        <div className='flex gap-3 text-text-dark text-xs'>
                            <span>{formatUsd(market.total_volume)} Vol.</span>
                            <span>Ends {formatMonthYear(market.closes_at)}</span>
                            <span>{market.participants_count} traders</span>
                        </div>
                    </div>
                    <div className='w-8 h-8 bg-gray-600 rounded-xl ml-auto mb-auto'>

                    </div>
                </div>

                {historyError
                    ? <StatusBox>Price history is unavailable right now.</StatusBox>
                    : <ChartPanel {...chart}/>}

                <Index outcomes={market.outcomes} colors={chart.colors}/>
                <TabsComponent links={['Comments','Activity']}>
                    <CommentsTab data={messages} />
                </TabsComponent>
            </div>

            <TradePanel/>
        </div>
    )
}
