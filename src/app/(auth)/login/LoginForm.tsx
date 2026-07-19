'use client'

import CustomInput from "@/components/CustomInput";
import FormButton from "@/components/FormButton";
import {useForm} from "react-hook-form";
import {authFailed, setCredentials} from "@/store/authSlice";
import {clearRegisterSession} from "@/app/(auth)/register/draft";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useRouter} from "next/navigation";


interface LoginFormProps {
    email:string,
    password:string,
}

export default function LoginForm() {

    const dispatch = useDispatch()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting}
    } = useForm<LoginFormProps>()

    const onSubmit = async (data:LoginFormProps) => {
        console.log('submit',data)

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            if(!response.ok) {
                dispatch(authFailed())
                throw new Error('Register failed')
            }

            const {user,access_token} = await response.json()

            dispatch(setCredentials({
                user,
                accessToken:access_token
            }))

            router.replace('/')
        } catch(e) {
            dispatch(authFailed())
            console.error(e)
        }

    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <CustomInput placeholder='Email'
                         {...register('email', {
                             required:'Enter Email',
                             pattern:{value:/^[^@]+@[^@.](?:[^@]*[^@.])?$/,message:'Invalid Email'},
                         })}
            />
            {errors.email && <span>{errors.email.message}</span>}
            <CustomInput placeholder='Password'
                         {...register('password', {
                             required:'Enter Password',
                             minLength:{value:8,message:'Invalid password'},
                         })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <FormButton text='Confirm' disabled={isSubmitting}/>
        </form>
    )
}