import LoginForm from "@/app/login/LoginForm";

export default function Login() {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col p-10 rounded-4xl border-white border h-[60%] w-200'>
                <h1 className='text-3xl font-semibold'>Login</h1>
                <LoginForm/>
                <button className='mt-auto mx-auto cursor-pointer underline'>Doesnt have an account?</button>
            </div>
        </div>
    )
}