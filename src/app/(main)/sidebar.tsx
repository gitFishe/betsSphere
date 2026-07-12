import SidebarButton from "@/app/(main)/_components/SidebarButton";

const LINKS = ['Home','List','History','Settings']

export default function Sidebar() {
    return (
        <div className='bg-[#1B1C20] h-full w-70 p-10 shrink-0'>
            <div className='flex flex-col gap-6'>
                {LINKS.map((item,i) => (
                    <SidebarButton key={i} text={item}/>
                ))}
            </div>
        </div>
    )
}