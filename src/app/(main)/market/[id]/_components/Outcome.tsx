import TradeButton from "@/app/(main)/market/[id]/_components/TradePanel/TradeButton";
import {formatUsd, toPercent} from "@/utils/format";

export const OUTCOME_ROW = 'grid grid-cols-[2.5rem_1fr_4rem_10rem] items-center gap-3';

interface OutcomeTypes {
    label: string,
    volume: number,
    price: number,
    color?: string,
}

export default function Outcome({label, volume, price, color}: OutcomeTypes) {
    return (
        <div className={`${OUTCOME_ROW} py-3 border-t-2 border-element`}>
            <div className='w-10 h-10 rounded-lg bg-white'/>
            <div className='min-w-0'>
                <h3 className='flex items-center gap-2 truncate'>
                    {/* Same hue this outcome carries in the chart above. */}
                    {color && <span className='w-2 h-2 rounded-full shrink-0' style={{background: color}}/>}
                    {label}
                </h3>
                <span className='text-text-dark'>{formatUsd(volume)} Vol.</span>
            </div>
            <span className='text-right font-bold tabular-nums'>{toPercent(price)}%</span>
            <div className='pl-5'>
                <TradeButton text='Yes' variant='yes'/>
            </div>
        </div>
    )
}
