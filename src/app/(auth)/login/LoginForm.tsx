'use client'

import CustomInput from "@/components/CustomInput";
import FormButton from "@/components/FormButton";

export default function LoginForm() {
    return(
        <form className='flex flex-col gap-4'>
            <CustomInput placeholder='Email'/>
            <CustomInput isHidden={true} placeholder='Password'/>
            <FormButton text='Confirm'/>
        </form>
    )
}