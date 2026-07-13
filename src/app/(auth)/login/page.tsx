import LoginForm from "@/app/(auth)/login/LoginForm";
import Link from "next/link";

export default function Login() {
    return (
        <>
            <h1 className='text-5xl font-semibold mb-10'>Login</h1>
            <LoginForm/>
            <Link href='/register' className='mt-auto mx-auto cursor-pointer underline'>Doesnt have an account?</Link>
        </>
    )
}