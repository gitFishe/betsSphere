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
export interface MarketTypes {
    "category": string,
    "closes_at": string,
    "created_at": string,
    "description": string,
    "id": string,
    "outcomes": [
        {
            "id": string,
            "label": string,
            "price": number,
            "thumbnail_url": string,
            "volume": number,
        }
    ],
    "participants_count": number,
    "resolved_outcome_id": string,
    "status": string,
    "thumbnail_url": string,
    "title": string,
    "total_volume": number
}