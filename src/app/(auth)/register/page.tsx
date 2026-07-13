import Link from "next/link";
import RegisterForm from "@/app/(auth)/register/RegisterForm";

export default function Register() {
    return (
        <>
            <h1 className='text-5xl font-semibold mb-10'>Register</h1>
            <RegisterForm/>
            <Link href='/login' className='mt-auto mx-auto cursor-pointer underline'>Have an account?</Link>
        </>
    )
}