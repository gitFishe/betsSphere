import CustomInput from "@/components/CustomInput";
import FormButton from "@/components/FormButton";

export default function RegisterForm() {
    return (
        <form className='flex flex-col gap-4'>
            <CustomInput placeholder='Email'/>
            <CustomInput placeholder='Password'/>
            <CustomInput isHidden={true} placeholder='Confirm password'/>

            <FormButton text='Confirm'/>
        </form>
    )
}