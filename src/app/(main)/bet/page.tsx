import TradePanel from "@/app/(main)/bet/_components/TradePanel";

export default function Bet() {
    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex items-center'>
                    <div className='w-16 h-16 bg-white'></div>
                    <div>
                        <h1>US recession in 2025?</h1>
                        <div className='flex'>
                            <span>$2,400.00</span>
                            <span>Ends Dec 31,2025</span>
                            <span>12,400 traders</span>
                        </div>
                    </div>
                </div>

                <div className='flex'>
                    <div>

                        <div>

                        </div>


                    </div>


                    <TradePanel/>
                </div>
            </div>
        </div>
    )
}