import {MarketTypes} from "@/types/types";
import BetsButton from "@/app/(main)/_components/BetsList/BetsButton";
import {formatMonthYear} from "@/utils/date";


export default function BetsListItem({category,description,outcomes,total_volume,participants_count,closes_at}:MarketTypes) {
    return (
        <div className='bg-element rounded-[22px] border-3 border-border-default p-4 flex flex-col justify-between shadow-component w-full 2xl:w-[calc(50%-0.75rem)]'>

            <div className='flex justify-between text-xs text-text-dark font-bold'>
                <span>{category}</span>
                <span>Ends in {formatMonthYear(closes_at)}</span>
            </div>

            <div className='flex items-center gap-3 my-3'>
                <div className='w-10 h-10 bg-white rounded-full shrink-0'></div>
                <div className='truncate'>
                    <span className='text-sm'>{description}</span>
                </div>
                <div className='ml-auto'>
                    <span className='block text-xl font-bold leading-3'>{Math.floor(outcomes[0].price * 100)}%</span>
                    <span className='text-xs text-text-dark'>Chance</span>
                </div>
            </div>
            <div className='flex gap-3 pb-3 mb-2 border-b-3 border-border-default'>
                <BetsButton text={`Yes ${Math.floor(outcomes[0].price * 100)}`} variant='yes'/>
                <BetsButton text={`No ${100 - Math.floor(outcomes[0].price * 100)}`}  variant='no'/>
            </div>
            <div className='text-xs text-text-dark'>
                <span className='mr-3'>${total_volume} Vol.</span>
                <span>{participants_count}</span>
            </div>


            {/*<div className='flex flex-col gap-3'>*/}
            {/*    <div className='w-3/4 h-4 rounded-full bg-[#22262D]'/>*/}
            {/*    <div className='w-full h-4 rounded-full bg-[#22262D]'/>*/}
            {/*</div>*/}

        </div>
    )
}