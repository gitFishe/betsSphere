import TradeButton from "@/app/(main)/bet/_components/TradePanel/TradeButton";
import {MarketOutcome} from "@/types/types";

export const OUTCOME_ROW = 'grid grid-cols-[2.5rem_1fr_4rem_10rem] items-center gap-3';

export default function Outcome({id,label,price,volume,thumbnail_url}:MarketOutcome) {
    return (
        <div className={`${OUTCOME_ROW} py-3 border-t-2 border-element`}>
            <div className='w-10 h-10 rounded-lg bg-white'/>
            <div>
                <h3>{label}</h3>
                <span className='text-text-dark'>{volume}</span>
            </div>
            <span className='text-right font-bold'>{Math.floor(price * 100)}%</span>
            <div className='pl-5'>
                <TradeButton text='Yes' variant='yes'/>
            </div>
        </div>
    )
}
