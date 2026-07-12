import Sidebar from "@/app/(main)/sidebar";

export default function MainLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className='h-screen bg-black py-6'>
            <div className='container h-full'>
                <div className='rounded-[50px] border-2 border-gray-500 overflow-hidden flex w-full h-full'>
                    <Sidebar/>
                    <div className='w-full h-full py-8 px-6'>{children}</div>
                </div>
            </div>
        </div>
    );
}