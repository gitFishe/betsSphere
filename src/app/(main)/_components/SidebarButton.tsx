import Link from "next/link";

interface SidebarButton {
    text:string,
    href?:string,
}

export default function SidebarButton({text,href = '/'}: SidebarButton) {
    return(
        <Link href={href} className='bg-element h-12 shadow-component border-2 border-border-default text-text-dark flex items-center gap-3 font-semibold px-5 rounded-2xl'>
            <div className='w-5 h-5 bg-text-dark'/>
            <span>{text}</span>
        </Link>
    )
}