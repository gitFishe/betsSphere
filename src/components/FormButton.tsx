interface CustomButtonProps {
    text:string,
    type?:'submit' | 'button'
}

export default function FormButton({text,type = 'submit'}:CustomButtonProps) {
    return (
        <button type={type} className='flex items-center font-semibold justify-center h-15 border text-input-text text-xl border-input-border rounded-xl bg-button-bg cursor-pointer'>
            <span>{text}</span>
        </button>
    )
}
