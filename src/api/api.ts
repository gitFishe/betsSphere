import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {RootState} from "@/store/store";
import {authFailed, setCredentials} from "@/store/authSlice";
import {RefreshResponse} from "@/types/types";

const rawBaseQuery = fetchBaseQuery({
    baseUrl:'http://localhost:8080/api',
    credentials:'include',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.accessToken
        if(token) headers.set('Authorization',`Bearer ${token}`)
        return headers
    },
})

const baseQueryWithReauth:BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args,api,extraOption) => {
        let result = await rawBaseQuery(args,api,extraOption)

        if(result.error?.status === 401) {
            const refresh = await rawBaseQuery(
                {url:'/auth/refresh',method:'POST'}, api,extraOption
            )
            if(refresh.data) {
                const {user,access_token} = refresh.data as RefreshResponse
                api.dispatch(setCredentials({user,accessToken:access_token}))
                result = await rawBaseQuery(args,api,extraOption)
            } else {
                api.dispatch(authFailed())
            }
        }
        return result
    }

export const baseApi = createApi({
    reducerPath:'api',
    baseQuery:baseQueryWithReauth,
    tagTypes:['User','Bets'],
    endpoints: () => ({}),
})