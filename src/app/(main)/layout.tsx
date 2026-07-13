import Sidebar from "@/app/(main)/_components/Sidebar";
import SearchBar from "@/app/(main)/_components/SearchBar";
import CustomLink from "@/components/CustomLink";

export default function MainLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className='h-screen bg-component-gradient py-6'>
            <div className='container h-full'>
                <div className='rounded-[50px] border-2 border-light-border overflow-hidden flex w-full h-full'>
                    <Sidebar/>
                    <div className='w-full flex flex-col pl-6 pt-8 pb-6 pr-10.5 bg-primary-dark'>

                        <div className='flex justify-between pb-8'>
                            <SearchBar/>
                            <div className='flex items-center gap-3'>
                                <CustomLink href='/login' text='Log in'/>
                                <CustomLink purple={true} href='/register' text='Sign Up'/>
                            </div>
                        </div>

                        <div className='w-full flex-1 min-h-0 '>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}