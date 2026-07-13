'use client'

import LiveChatMessage,{ChatMessage} from "@/app/(main)/_components/LiveChat/message";
import {useState} from "react";
import {useForm} from "react-hook-form";

interface ChatForm {
    message:string
}

const TEST_ARRAY = ['first','second','third']

export default function LiveChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([])

    const {
        register,
        handleSubmit,
        reset
    } = useForm<ChatForm>({
        defaultValues:{message:''}
    })


    const onSubmit = ({message}:ChatForm) => {
        setMessages((prev) => [...prev,{id:crypto.randomUUID(), author:'Ho Lee Sheet', text:message}])
        reset()
    }

    return (
        <div className='flex flex-col flex-1 min-h-0 rounded-4xl overflow-hidden bg-component font-semibold border-[3px] border-border-default shadow-component'>
            <div className='px-6 pt-6 pb-5 text-3xl text-text'>
                <h3>Live Chat</h3>
            </div>
            <div className='flex flex-col flex-1 min-h-0 overflow-y-auto no-scrollbar pt-3 px-4 gap-3'>
                {messages.slice(0,20).map((item,i) => (
                    <LiveChatMessage key={i} text={item.text} author={item.author}/>
                ))}
            </div>
            <div className='p-4 border-t border-border-default'>
                <div className='rounded-full bg-element shadow-component'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register('message', {required:true})} className='px-6 py-3 w-full text-xl' placeholder='Write a message...'/>
                    </form>
                </div>
            </div>
        </div>
    )
}