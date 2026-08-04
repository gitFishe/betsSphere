type TradeVariant = 'yes' | 'no' | 'neutral'

const variants:Record<TradeVariant,string> = {
    yes:'bg-[#12291E] text-[#34C77B] border-[#1D4230]',
    no:'bg-[#2B1817] text-[#E4574F] border-[#4A2320]',
    neutral:'bg-gray-500 border-border-default'
}

export default function TradeButton ({text,variant = 'neutral'}:{text:string,variant?:TradeVariant}) {
    return (
        <button
            className={`font-bold border w-full text-center text-sm rounded-lg p-2 ${variants[variant]}`}>
            <span>{text}</span>
        </button>
    )
}
