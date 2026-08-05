import OutcomeElement, {OUTCOME_ROW} from "@/app/(main)/market/[id]/_components/Outcome/OutcomeElement";
import {MarketOutcome} from "@/types/types";

interface OutcomesListProps {
    outcomes: MarketOutcome[],
    colors?: Map<string, string>,
}

export default function Index({outcomes, colors}: OutcomesListProps) {
    return (
        <div className='p-5 rounded-2xl border-3 border-border-default bg-component shadow-component'>
            <div className={`${OUTCOME_ROW} text-text-dark font-bold mb-3`}>
                <span>OUTCOME</span>
                <span/>
                <span className='text-center'>CHANCE</span>
                <span/>
            </div>
            <div>
                {outcomes.map(outcome => (
                    <OutcomeElement
                        key={outcome.id}
                        label={outcome.label}
                        volume={outcome.volume}
                        price={outcome.price}
                        color={colors?.get(outcome.id)}
                    />
                ))}
            </div>
        </div>
    )
}
