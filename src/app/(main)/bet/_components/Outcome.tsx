import TradeButton from "@/app/(main)/bet/_components/TradePanel/TradeButton";

export const OUTCOME_ROW = 'grid grid-cols-[2.5rem_1fr_4rem_10rem] items-center gap-3';

interface OutcomeTypes {
    name:string,
    volume:string,
    chance:number
}

export default function Outcome({name,volume,chance}:OutcomeTypes) {
    return (
        <div className={`${OUTCOME_ROW} py-3 border-t-2 border-element`}>
            <div className='w-10 h-10 rounded-lg bg-white'/>
            <div>
                <h3>{name}</h3>
                <span className='text-text-dark'>{volume}</span>
            </div>
            <span className='text-right font-bold'>{chance}%</span>
            <div className='pl-5'>
                <TradeButton text='Yes' variant='yes'/>
            </div>
        </div>
    )
}
