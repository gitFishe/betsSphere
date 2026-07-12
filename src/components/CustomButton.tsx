interface ButtonProps {
    text:string
}

export default function CustomButton({text}:ButtonProps) {
    return (
        <button className='px-4.5 rounded-xl border-2 border-border-default text-text-dark text-xl font-semibold cursor-pointer flex items-center h-12 shadow-component'>
            <span>{text}</span>
        </button>
    )
}