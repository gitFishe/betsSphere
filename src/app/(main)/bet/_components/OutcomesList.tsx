import Outcome, {OUTCOME_ROW} from "@/app/(main)/bet/_components/Outcome";
import {MarketOutcome} from "@/types/types";

const DATA = [
    {
        name:'Recession declared by NBER',
        volume:'$1,200,000 Vol.',
        chance:69,
    },
    {
        name:'Recession declared by NBER',
        volume:'$1,200,000 Vol.',
        chance:69,
    },
    {
        name:'Recession declared by NBER',
        volume:'$1,200,000 Vol.',
        chance:69,
    },
    {
        name:'Recession declared by NBER',
        volume:'$1,200,000 Vol.',
        chance:69,
    },
    {
        name:'Recession declared by NBER',
        volume:'$1,200,000 Vol.',
        chance:69,
    }
]

export default function OutcomesList({data}:{data?:MarketOutcome[]}) {
    return (
        <div className='p-5 rounded-2xl border-3 border-border-default bg-component shadow-component'>
            <div className={`${OUTCOME_ROW} text-text-dark font-bold mb-3`}>
                <span>OUTCOME</span>
                <span/>
                <span className='text-center'>CHANCE</span>
                <span/>
            </div>
            <div>
                {data?.map((item,i) => (
                    <Outcome key={i} {...item}/>
                ))}
            </div>
        </div>
    )
}