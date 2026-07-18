'use client'

import {useEffect} from "react";
import {setCredentials} from "@/store/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";

export default function AuthBootstrap() {
    const auth = useSelector((state:RootState) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('Auth Bootstrap auth',auth)
    }, [auth]);

    useEffect(() => {
        const restoreAccess = async ()  => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/refresh', {
                    method: 'POST',
                    credentials: 'include',
                })

                if(!response.ok) {
                    throw new Error('Refresh access failed')
                }

                const {user,access_token} = await response.json()

                dispatch(setCredentials({
                    user,
                    accessToken:access_token
                }))

                console.log(response,'response')

            } catch(e) {
                console.error(e)
            }
        }
        restoreAccess()
    },[dispatch])

    return (
        <div>

        </div>
    )
}