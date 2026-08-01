import TradeButton from "@/app/(main)/bet/_components/TradePanel/TradeButton";
import TradeInput from "@/app/(main)/bet/_components/TradePanel/TradeInput";
import TradeInfo from "@/app/(main)/bet/_components/TradePanel/TradeInfo";

export interface TradeInfoTypes {
    avgPrice:string,
    shares:string,
    potentialReturn:string,
}

const TRADE_INFO:TradeInfoTypes = {
    avgPrice:'69¢',
    shares:'144.9',
    potentialReturn:'$144.93 (45%)',
}

export default function TradePanel () {
    return (
        <div className='border-3 shrink-0 h-max shadow-component sticky top-0 border-border-default bg-component rounded-2xl p-5 w-75'>

            <div className='flex gap-2'>
               <div className='w-10 h-10 shrink-0 bg-white'></div>
                <div className='font-bold'>
                    <h3 className='text-text-dark'>Lorem ipsum</h3>
                    <div className='flex gap-4 text-text'>
                        <span>Lorem ipsum dolor.</span>
                        <span>Yes</span>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <TradeButton variant='yes' text='Yes'/>
                <TradeButton variant='no' text='No'/>
            </div>

            <div className='mt-3 border-b border-gray-700 pb-4'>
                <TradeInput/>
            </div>

            <TradeInfo data={TRADE_INFO}/>
            <button className='text-sm font-bold w-full text-center rounded-lg bg-button-purple p-3 mt-4'>Buy Yes</button>
            <p className='text-center text-xs text-text-dark mt-3'>By trading, you agree to the Terms of Use</p>

        </div>
    )
}