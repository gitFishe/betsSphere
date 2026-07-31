import {TradeInfoTypes} from "@/app/(main)/bet/_components/TradePanel/index";

export default function TradeInfo({data}:{data:TradeInfoTypes}) {
    return (
        <div className='flex flex-col mt-5 gap-1'>

            {/*<div className='flex justify-between'>*/}
            {/*    <span></span>*/}
            {/*    <span></span>*/}
            {/*</div>*/}
            {/*<div className='flex justify-between'>*/}
            {/*    <span></span>*/}
            {/*    <span></span>*/}
            {/*</div>*/}
            {/*<div className='flex justify-between'>*/}
            {/*    <span></span>*/}
            {/*    <span></span>*/}
            {/*</div>*/}


            {Object.entries(data).map((item,i) => (
                <div key={i} className='flex justify-between text-xs'>
                    <span className='text-text-dark'>{item[0]}</span>
                    <span className='font-bold'>{item[1]}</span>
                </div>
            ))}
        </div>
    )
}
