interface ItemProps {
    title?:string,
}

export default function BetsListItem({title}:ItemProps) {
    return (
        <div className='bg-element w-full rounded-[22px] p-6 flex justify-between shadow-component'>
            <div className='flex flex-col'>
                <h3 className='text-2xl text-text font-semibold mb-4.5'>{title}</h3>
                <div className='flex flex-col gap-3'>
                    <div className='w-30 h-4 rounded-full bg-[#22262D]'/>
                    <div className='w-50 h-4 rounded-full bg-[#22262D]'/>
                </div>
            </div>
        </div>
    )
}