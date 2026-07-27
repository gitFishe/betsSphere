import {User} from "@/types/types";

export interface RefreshResponse {
    user: User
    access_token: string
}