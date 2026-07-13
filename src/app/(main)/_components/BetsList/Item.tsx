interface ItemProps {
    title?:string,
}

export default function BetsListItem({title}:ItemProps) {
    return (
        <div className='bg-element rounded-[22px] p-6 flex justify-between shadow-component w-full 2xl:w-[calc(50%-0.75rem)]'>
            <div className='flex flex-col w-full'>
                <h3 className='text-2xl text-text font-semibold mb-4.5 truncate'>{title}</h3>
                <div className='flex flex-col gap-3'>
                    <div className='w-3/4 h-4 rounded-full bg-[#22262D]'/>
                    <div className='w-full h-4 rounded-full bg-[#22262D]'/>
                </div>
            </div>
        </div>
    )
}