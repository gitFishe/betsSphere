import BetsListItem from "@/app/(main)/_components/BetsList/Item";

const TEST_ARRAY = ['first','second','third','fourth','fifth','first','second','third','fourth','fifth','first','second','third','fourth','fifth','first','second','third','fourth','fifth']

export default function BetsList() {
    return (
        <div className='w-full p-6 rounded-4xl max-h-full overflow-hidden flex flex-col bg-component shadow-component'>
            <div className='text-3xl font-semibold mb-5'>
                <h1>Place Your Bets</h1>
            </div>
            <div className='flex flex-wrap content-start flex-1 min-h-0 overflow-y-auto no-scrollbar gap-6 px-0.75'>
                {TEST_ARRAY.slice(0,20).map((item,i) => (
                    <BetsListItem key={i} title={item}/>
                ))}
            </div>
        </div>
    )
}