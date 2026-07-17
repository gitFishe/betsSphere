import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    user:{
        username:string
        email:string,
    } | null
}

const initialState:AuthState = {user:{username:'hi',email:'world'}}

const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setUser: (state,action:PayloadAction<AuthState['user']>) => {
            state.user = action.payload
        },
        logout: (state) => {
          state.user = null
        }
    }
})

export const {setUser,logout} = AuthSlice.actions
export default AuthSlice.reducer