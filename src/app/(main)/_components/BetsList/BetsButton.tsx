type TradeVariant = 'yes' | 'no'

const variants:Record<TradeVariant,string> = {
    yes:'hover:bg-[#12291E] text-[#34C77B]',
    no:'hover:bg-[#2B1817] text-[#E4574F]',
}

export default function BetsButton ({text,variant}:{text:string,variant:TradeVariant}) {
    return (
        <button
            className={`font-bold bg-component w-full text-center text-sm rounded-lg p-2 ${variants[variant]}`}>
            <span>{text}</span>
        </button>
    )
}
