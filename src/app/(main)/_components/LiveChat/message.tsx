interface LiveChatMessageProps {
    text:string,
}

export default function LiveChatMessage({text}:LiveChatMessageProps) {
    return (
        <div className='bg-element text-text-dark border border-border-default rounded-[22px] p-4 pb-5 justify-between flex flex-col w-full'>
            <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-black'/>
                <h3 className='text-xl'>{text}</h3>
            </div>
            <p className='mt-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate</p>
        </div>
    )
}