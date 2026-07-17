import Link from "next/link";
import RegisterForm from "@/app/(auth)/register/RegisterForm";

export default function Register() {
    return (
        <div className='relative h-full'>
            <div className='absolute w-full h-full left-0 top-0 flex flex-col'>
                <h1 className='text-5xl font-semibold mb-10'>Register</h1>
                <RegisterForm/>
                <Link href='/login' className='mt-auto mx-auto cursor-pointer underline'>Have an account?</Link>
            </div>
            <div className='absolute'>

            </div>
        </div>
    )
}