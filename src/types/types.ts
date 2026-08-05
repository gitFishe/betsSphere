export interface User {
    id: string
    username: string
    email: string
    avatar_url: string | null
    balance: number
    created_at:string
    stats: {
        losses:number,
        total_bets:number,
        total_volume:number,
        win_rate:number,
        wins:number,
    }
}

export interface ChatMessage {
    id:string
    author: {
        id: string,
        username: string,
        avatar_url: string | null
    }
    body:string
    created_at:string,
    reply_to:boolean,
    reactions:{
      count:number,
      emoji:string,
      reacted:boolean,
    },
}

export interface MarketTypes {
    "category": string,
    "closes_at": string,
    "created_at": string,
    "description": string,
    "id": string,
    "outcomes": MarketOutcome[],
    "participants_count": number,
    "resolved_outcome_id": string | null,
    "status": string,
    "thumbnail_url": string | null,
    "title": string,
    "total_volume": number
}

export interface MarketOutcome {
    "id": string,
    "label": string,
    "price": number,
    "thumbnail_url": string | null,
    "volume": number,
}

export interface MarketPriceHistory {
    outcome_id:string,
    points: MarketPoint[]
}

export interface MarketPoint {
    price:number,
    recorded_at:string
}