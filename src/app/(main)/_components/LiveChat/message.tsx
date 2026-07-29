import {ChatMessage} from "@/types/types";

export default function LiveChatMessage({author,body}:Pick<ChatMessage,'body' | 'author'>) {
    return (
        <div className='bg-element text-text-dark border border-border-default rounded-[22px] p-4 pb-5 justify-between flex flex-col w-full shadow-component'>
            <div className='flex items-center gap-3'>
                <div className='w-8 h-8'>
                    <img className='w-full h-full object-cover' src='/Ho-Lee-Sheet.jpg'/>
                </div>
                <h3 className='text-xl'>{author.username}</h3>
            </div>
            <p className='mt-2 break-words whitespace-pre-wrap'>{body}</p>
        </div>
    )
}