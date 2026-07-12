const TEST_ARRAY = ['first','second','third','fourth','fifth','first','second','third','fourth','fifth','first','second','third','fourth','fifth']

export default function BetsList() {
    return (
        <div className='w-150 bg- p-6 rounded-4xl max-h-full overflow-hidden flex flex-col shrink-0 bg-component shadow-component'>
            <div className='text-3xl font-semibold mb-5'>
                <h1>Place Your Bets</h1>
            </div>
            <div className='flex flex-col flex-1 min-h-0 overflow-y-auto gap-6'>
                {TEST_ARRAY.slice(0,20).map((item,i) => (
                    <div key={i} className='bg-element w-full rounded-[22px] p-6 flex justify-between'>
                        <div className='flex flex-col'>
                            <h3>{item}</h3>
                            <div className='w-30 h-4 rounded-full bg-[#22262D]'/>
                            <div className='w-50 h-4 rounded-full bg-[#22262D]'/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}