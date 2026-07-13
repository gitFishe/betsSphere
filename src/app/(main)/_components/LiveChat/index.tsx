import LiveChatMessage from "@/app/(main)/_components/LiveChat/message";

const TEST_ARRAY = ['first','second','third','fourth','fifth','first','second','third','fourth','fifth','first','second','third','fourth','fifth']

export default function LiveChat() {

    return (
        <div className='flex flex-col flex-1 min-h-0 rounded-4xl overflow-hidden bg-component font-semibold border-[3px] border-border-default shadow-component'>
            <div className='px-6 pt-6 pb-5 text-3xl text-text'>
                <h3>Live Chat</h3>
            </div>
            <div className='flex flex-col flex-1 min-h-0 overflow-y-auto no-scrollbar pt-3 px-4 gap-3'>
                {TEST_ARRAY.slice(0,20).map((item,i) => (
                    <LiveChatMessage key={i} text={item}/>
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