import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

interface AuthState {
    user:{
        username:string
        email:string,
    } | null
    accessToken:string | null,
    status: AuthStatus
}

const initialState:AuthState = {user:null,accessToken:null,status:'loading'}

const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredentials: (state,action:PayloadAction<{ user:AuthState['user'], accessToken:string }>) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.status = 'authenticated'
        },
        authFailed: (state) => {
          state.user = null
          state.accessToken = null
          state.status = 'unauthenticated'
        },
        authLogout: (state) => {
            state.user = null
            state.accessToken = null
            state.status = 'unauthenticated'
        }
    }
})

export const {setCredentials,authLogout,authFailed} = AuthSlice.actions
export default AuthSlice.reducer