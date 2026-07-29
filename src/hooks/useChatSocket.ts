import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {ChatMessage} from "@/types/types";


export default function useChatSocket({marketId}:{marketId?:string} = {}) {

    const token = useSelector((s:RootState) => s.auth.accessToken)
    const channel = marketId ? `market_chat:${marketId}` : 'global_chat'
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const wsRef = useRef<WebSocket | null>(null)


    useEffect(() => {
        if(!token) return

        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}?token=${token}`)
        wsRef.current = ws

        ws.onopen = () => ws.send(JSON.stringify({type:'subscribe', channel}))

        ws.onmessage = (e) => {
            const msg = JSON.parse(e.data)
            if(msg.type === 'history') setMessages(msg.data)
            if(msg.type === 'chat_message') setMessages((prev) => [...prev,msg.data])
            if (msg.type === 'error') console.error('[chat]', msg.message)

            console.log('[ws] RAW:', e.data)
            console.log('[ws] PARSED:', JSON.parse(e.data))
        }



        return() => {
            ws.close()
            wsRef.current = null
        }

    }, [token,channel]);

    const sendMessage = (body:string) => {
        const ws = wsRef.current
        if(ws?.readyState !== WebSocket.OPEN) return
        ws.send(JSON.stringify({type:'chat_message',channel,body}))
    }

    return {messages,sendMessage}
}
