'use client'

import {useForm} from "react-hook-form";

interface RegisterFormProps {
    email:string,
    password:string,
    confirmPassword:string,
}

import CustomInput from "@/components/CustomInput";
import FormButton from "@/components/FormButton";

export default function RegisterForm() {


    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting}
    } = useForm<RegisterFormProps>()


    const onSubmit = (data:RegisterFormProps) => {
        console.log('submit',data)
    }


    return (
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
            <CustomInput
                        isHidden={true}
                        placeholder='Confirm password'
                        {...register('confirmPassword', {
                            required:'Confirm password',
                            validate: (value,formValues) => value === formValues.password || 'Incorrect Password'
                        })}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

            <FormButton text='Confirm' disabled={isSubmitting}/>
        </form>
    )
}