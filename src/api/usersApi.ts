import {baseApi} from "@/api/api";
import {User} from "@/types/types";

export const usersApi = baseApi.injectEndpoints({
    endpoints:(build) => ({
        getMe:build.query<User,void>({
            query:() => '/users/me',
            providesTags:['User'],
        }),
    }),
})

export const { useGetMeQuery } = usersApi