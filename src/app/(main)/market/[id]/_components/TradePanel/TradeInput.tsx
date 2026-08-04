
const OPTIONS = [
    '+10$','+50%','+$100','Max'
]

export default function TradeInput() {
    return (
        <>
            <span className='text-xs text-text-dark'>AMOUNT</span>
            <div className="bg-element rounded-lg border-2 border-border-default relative
                before:content-['$'] before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:text-text-dark">
                <input className='w-full py-3 pl-8 pr-4'/>
            </div>
            <div className='flex justify-between gap-2 mt-2'>
                {OPTIONS.map((item,i) => (
                    <button key={i} className='w-full py-1 bg-element rounded-lg cursor-pointer text-xs text-text-dark'>{item}</button>
                ))}
            </div>
        </>
    )
}