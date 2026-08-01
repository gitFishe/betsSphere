import TradePanel from "@/app/(main)/bet/_components/TradePanel";
import OutcomesList from "@/app/(main)/bet/_components/OutcomesList";
import TabsComponent from "@/components/TabsComponent";
import CommentsTab from "@/components/TabsComponent/CommentsTab";
import Chart from "@/app/(main)/bet/_components/Chart";

const CHART_DATA = [
    {t:'Jan', pct:18},
    {t:'Feb', pct:24},
    {t:'Mar', pct:31},
    {t:'Apr', pct:27},
    {t:'May', pct:38},
    {t:'Jun', pct:45},
    {t:'Jul', pct:41},
    {t:'Aug', pct:53},
    {t:'Sep', pct:49},
    {t:'Oct', pct:61},
    {t:'Nov', pct:68},
    {t:'Dec', pct:76},
]

export default function Bet() {
    return (
        <div className='flex h-full gap-10 overflow-y-auto no-scrollbar'>
            <div className='relative w-full flex flex-col gap-6'>
                <div className='flex items-center gap-4 sticky top-0 left-0 bg-component z-100 p-3 rounded-2xl border-3 border-border-default shadow-component'>
                    <div className='w-15 h-15 bg-white rounded-2xl'></div>
                    <div>
                        <h1 className='text-2xl text-text font-bold'>US recession in 2025?</h1>
                        <div className='flex text-text-dark text-xs'>
                            <span>$2,400.00</span>
                            <span>Ends Dec 31,2025</span>
                            <span>12,400 traders</span>
                        </div>
                    </div>
                    <div className='w-8 h-8 bg-gray-600 rounded-xl ml-auto mb-auto'>

                    </div>
                </div>

                <Chart data={CHART_DATA}/>
                <OutcomesList/>
                <TabsComponent links={['Comments','Activity']}>
                    <CommentsTab/>
                </TabsComponent>
            </div>



            <TradePanel/>
        </div>
    )
}