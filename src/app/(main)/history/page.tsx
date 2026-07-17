'use client'

import {useEffect, useState} from "react";


interface ProductsProps {
    brand:string,
}

export default function History() {
    const [data, setData] = useState<ProductsProps[]>([])
    const [filtered, setFiltered] = useState<ProductsProps[]>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const rawData = await fetch('https://62d92de95d893b27b2dfeae8.mockapi.io/products/all')
                const data = await rawData.json()

                setData(data.products)

            } catch(e) {
                console.error(e)
            }
        }

        getData()
    },[])
    console.log(data)
    const filterData = (text:string) => {
        setFiltered(data.filter((e) => e.brand.toLowerCase().includes(text.toLowerCase())))
    }

    return (
        <div>
            <div className='bg-input-bg border-input-border w-fit'>
                <input onChange={(e) => filterData(e.target.value)} className='w-100 h-10 px-3'/>
            </div>

            <div className='flex gap-10'>
                <div className='flex flex-col'>
                    {data.map((item,i) => (
                        <span key={i}>{item.brand}</span>
                    ))}
                </div>
                <div>
                    {filtered.map((item,i) => (
                        <span key={i}>{item.brand}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}