
interface CustomInputTypes {
    placeholder?:string,
    isHidden?:boolean,
}

export default function CustomInput({placeholder,isHidden = false , ...props}:CustomInputTypes) {
    return(
        <div className='w-full rounded-xl text-xl text-text-dark border border-input-border bg-input-bg flex items-center justify-between font-semibold relative'>
            <input {...props} className={`w-full text-input-text h-15 ${isHidden ? 'pl-5 pr-18' : 'px-5'}`} placeholder={placeholder}/>
            {isHidden ?
                <button className='absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 border border-white'></button>
                : ''
            }
        </div>
    )
}