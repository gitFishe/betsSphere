'use client'
import {ReactNode, useLayoutEffect, useRef, useState} from "react";

export default function TabsComponent({children,links}:{children:ReactNode,links:string[]}) {
    const [active,setActive] = useState(0)
    const [hovered,setHovered] = useState<number | null>(null)
    const [indicator,setIndicator] = useState({left:0,width:0})

    const tabsRef = useRef<(HTMLSpanElement | null)[]>([])

    const target = hovered ?? active

    useLayoutEffect(() => {
        const el = tabsRef.current[target]
        if (el) setIndicator({left:el.offsetLeft, width:el.offsetWidth})
    }, [target, links])

    return (
        <div className='h-full rounded-2xl shadow-component bg-component border-2 border-border-default w-full flex flex-col p-4'>
            <div className='relative border-b-3 border-border-default flex items-center text-xl font-semibold text-text-dark shrink-0'
                 >
                {links.map((item,i) => (
                    <button
                        key={item}
                        onClick={() => setActive(i)}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}

                        className={`cursor-pointer first:pl-0 pb-5 px-4 transition-colors ${i === active ? 'text-text' : 'hover:text-text'}`}
                    >
                        <span ref={el => {tabsRef.current[i] = el}}>{item}</span>
                    </button>
                ))}

                <span
                    className='absolute -bottom-0.75 h-0.75 bg-text rounded-full transition-all duration-300 ease-out'
                    style={{left:indicator.left, width:indicator.width}}
                />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
