type TradeVariant = 'yes' | 'no' | 'neutral'

const variants:Record<TradeVariant,string> = {
    yes:'bg-green-500',
    no:'bg-red-500',
    neutral:'bg-gray-500'
}

export default function TradeButton ({text,variant = 'neutral'}:{text:string,variant?:TradeVariant}) {

    return (
        <button
            className={`border border-border-default w-full text-center text-sm bg-gray-500 rounded-lg p-2 ${variants[variant]}`}>
            <span>{text}</span>
        </button>
    )
}
