import Link from "next/link";

interface ButtonProps {
    text:string
    href:string,
    purple?:boolean
}

export default function CustomLink({text,href,purple = false}:ButtonProps) {
    return (
        <Link href={href} className={`px-4.5 rounded-xl border-2   text-xl font-semibold cursor-pointer flex items-center h-12 shadow-component ${purple ? 'bg-button-purple text-text border-[#43436B]' : 'bg-button-black text-text-dark border-border-default'}`}>
            <span>{text}</span>
        </Link>
    )
}