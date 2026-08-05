import SidebarButton from "@/app/(main)/_components/Sidebar/Button";

const LINKS = [
    {title:'Home',href:'/'},
    {title:'List',href:'/list'},
    {title:'History',href:'/history'},
    {title:'Settings',href:'/settings'},
]

export default function Sidebar() {
    return (
        <div className='bg-[#1B1C20] h-full w-70 p-10 shrink-0'>
            <div className='flex flex-col gap-6'>
                {LINKS.map((item,i) => (
                    <SidebarButton key={i} href={item.href} text={item.title}/>
                ))}
            </div>
        </div>
    )
}