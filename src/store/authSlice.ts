import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    user:{
        username:string
        email:string,
    } | null
    accessToken:string | null,
}

const initialState:AuthState = {user:null,accessToken:null}

const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredentials: (state,action:PayloadAction<{ user:AuthState['user'], accessToken:string }>) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
        },
        logout: (state) => {
            state.user = null
            state.accessToken = null
        }
    }
})

export const {setCredentials,logout} = AuthSlice.actions
export default AuthSlice.reducer