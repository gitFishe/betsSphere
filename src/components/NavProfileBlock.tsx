import Link from "next/link";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {authLogout} from "@/store/authSlice";

interface NavProfileProps {
    username:string,
    img?:string,
}

export default function NavProfileBlock ({username,img}:NavProfileProps) {


    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)


    const logout = () => {
        dispatch(authLogout())
    }

    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(prev => !prev)} className={`px-4.5 rounded-xl border-2   text-xl gap-3 font-semibold cursor-pointer flex items-center h-12 shadow-component bg-button-black text-text-dark border-border-default z-20 relative`}>
                <div className='w-10 h-10 bg-black'>
                    <img src={img}/>
                </div>
                <span>{username}</span>
            </button>
            <div className={`flex flex-col gap-3 absolute top-0 left-0 w-full pt-15 px-4 pb-4 z-10 rounded-xl shadow-component font-semibold text-text-dark border-border-default bg-button-black ${isOpen ? 'flex' : 'hidden'}`}>
                <li><Link href='/'>Account</Link></li>
                <li><Link href='/'>Settings</Link></li>
                <li><button onClick={logout}>Log out</button></li>
            </div>
        </div>
    )
}