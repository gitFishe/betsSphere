export interface User {
    id: string
    username: string
    email: string
    avatar_url: string | null
    balance: number
    created_at:string
}
export interface ChatMessage {
    id:string
    author: {
        id: string,
        username: string,
        avatar_url: string | null
    }
    body:string
    created_at:string
}
