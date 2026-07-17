export default function AuthLayout({children}:{children: React.ReactNode}) {
    return (
        <div className='w-screen h-screen flex items-center justify-center bg-page-gradient'>
            <div className='flex flex-col px-15 py-16 rounded-[50px] bg-auth-card-gradient border-2 border-auth-border w-175 h-175 shadow-auth-card'>
                {children}
            </div>
        </div>
    )
}