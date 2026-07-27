import {configureStore} from "@reduxjs/toolkit";
import authReducer from './authSlice'
import {baseApi} from "@/api/api";

export const store = () => configureStore({
    reducer: {
        auth:authReducer,
        [baseApi.reducerPath]:baseApi.reducer
    },
    middleware:(getDefault) => getDefault().concat(baseApi.middleware)
})

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']