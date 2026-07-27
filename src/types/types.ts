export interface User {
    id: string
    username: string
    email: string
    avatar_url: string | null
    balance: number
}

export interface RefreshResponse {
    user: User
    access_token: string
}
