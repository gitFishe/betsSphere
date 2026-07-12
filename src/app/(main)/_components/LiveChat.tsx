
const TEST_ARRAY = ['first','second','third','fourth','fifth','first','second','third','fourth','fifth','first','second','third','fourth','fifth']


export default function LiveChat() {

    return (
        <div className='flex flex-col flex-1 min-h-0 rounded-4xl overflow-hidden bg-component font-semibold border-[3px] border-border-default shadow-component'>
            <div className='px-6 pt-6 pb-5 text-3xl text-text'>
                <h3>Live Chat</h3>
            </div>
            <div className='flex flex-col flex-1 min-h-0 overflow-y-auto  pt-3 px-4 gap-3'>
                {TEST_ARRAY.slice(0,20).map((item,i) => (
                    <div key={i} className='bg-element text-text-dark border border-border-default rounded-[22px] p-4 pb-5 justify-between flex flex-col w-full'>
                        <div className='flex items-center gap-3'>
                            <div className='w-8 h-8 bg-black'/>
                            <h3 className='text-xl'>{item}</h3>
                        </div>
                        <p className='mt-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate</p>
                    </div>
                ))}
            </div>
            <div className='p-4 border-t border-border-default'>
                <div className='rounded-full bg-element'>
                    <input className='px-6 py-3 w-full text-xl' placeholder='Write a message...'/>
                </div>
            </div>
        </div>
    )
}