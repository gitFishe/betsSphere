'use client'

import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {authLogout} from "@/store/authSlice";
import {User} from "@/types/types";
import {usePathname} from "next/navigation";

export default function NavProfileBlock ({user}:{user?:User}) {

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)


    const logout = () => {
        dispatch(authLogout())
    }

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return

        const onPointerDown = (e: PointerEvent) => {
            if (!ref.current?.contains(e.target as Node)) setIsOpen(false)
        }
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false)
        }
        const onPopState = () => setIsOpen(false)

        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)
        window.addEventListener('popstate', onPopState)

        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('popstate', onPopState)
        }
    }, [isOpen])

    return (
        <div ref={ref} className='relative'>
            <button onClick={() => setIsOpen(prev => !prev)} className={`px-4.5 rounded-xl border-2   text-xl gap-3 font-semibold cursor-pointer flex items-center h-12 shadow-component bg-button-black text-text-dark border-border-default z-20 relative`}>
                <div className='w-8 h-8 bg-black rounded-md overflow-hidden'>
                    <img className='w-full h-full object-cover' src={user?.avatar_url ?? '/Ho-Lee-Sheet.jpg'}/>
                </div>
                <span>{user?.username}</span>
            </button>
            <div className={`flex flex-col gap-3 absolute top-0 left-0 w-full pt-15 px-4 pb-4 z-10 rounded-xl shadow-component font-semibold text-text-dark border-border-default bg-button-black ${isOpen ? 'flex' : 'hidden'}`}>
                <li><Link href={`/user/${user?.id}`} onNavigate={() => setIsOpen(false)}>Account</Link></li>
                <li><Link href='/settings' onNavigate={() => setIsOpen(false)}>Settings</Link></li>
                <li><button onClick={logout}>Log out</button></li>
            </div>
        </div>
    )
}