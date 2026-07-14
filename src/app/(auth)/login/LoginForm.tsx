'use client'

import CustomInput from "@/components/CustomInput";
import FormButton from "@/components/FormButton";
import {useForm} from "react-hook-form";


interface LoginFormProps {
    email:string,
    password:string,
}

export default function LoginForm() {


    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting}
    } = useForm<LoginFormProps>()


    const onSubmit = (data:LoginFormProps) => {
        console.log('submit',data)
    }



    return(
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <CustomInput placeholder='Email'
                         {...register('email', {
                             required:'Enter Email',
                             pattern:{value:/^\S+@\S+\.\S+$/,message:'Invalid Email'},
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