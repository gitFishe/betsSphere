'use client'

import {useForm} from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import FormButton from "@/components/FormButton";
import {useEffect} from "react";
import {getRegisterSession, saveToSession} from "@/app/(auth)/register/draft";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {setUser} from "@/store/authSlice";


interface RegisterFormProps {
    email:string,
    password:string,
    confirmPassword:string,
    username:string,
}
export default function RegisterForm() {

    const auth = useSelector((state:RootState) => state.auth.user)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('auth',auth)
    }, [auth]);

    const {
        register,
        handleSubmit,
        subscribe,
        formState:{errors,isSubmitting}
    } = useForm<RegisterFormProps>({
        defaultValues:async () => getRegisterSession() ?? {
            email:'',password:'',confirmPassword:'',username:'',
        }

    })

    useEffect(() => subscribe({
        formState:{values:true},
        callback:({values}) => saveToSession(values)
    }),[subscribe])

    const registerFetch = async (data:RegisterFormProps) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            if(!response.ok) {
                throw new Error('Register failed')
            }

            const result = await response.json()

            const {username,email} = result.user

            dispatch(setUser({username,email}))
        } catch(e) {
            console.error(e)
        }
    }




    const onSubmit = (data:RegisterFormProps) => {
        registerFetch(data)
    }


    return (
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
            <CustomInput
                        isHidden={true}
                        placeholder='Confirm password'
                        {...register('confirmPassword', {
                            required:'Confirm password',
                            validate: (value,formValues) => value === formValues.password || 'Incorrect Password'
                        })}
            />
            <CustomInput
                placeholder='Enter username'
                {...register('username', {
                    required:'Enter username',
                    minLength:{value:2,message:'Min length is 2'}
                })}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

            <FormButton text='Confirm' disabled={isSubmitting}/>
        </form>
    )
}