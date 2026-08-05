import {baseApi} from "@/api/api";
import {User} from "@/types/types";

export const usersApi = baseApi.injectEndpoints({
    endpoints:(build) => ({
        getMe:build.query<User,void>({
            query:() => '/users/me',
            providesTags:['User'],
        }),
        getUser:build.query<User,string>({
            query:(id) => `/users/${id}`,
            providesTags:(result,error,id) => [{type:'User',id}],
        }),
    }),
})

export const { useGetMeQuery,useGetUserQuery } = usersApi