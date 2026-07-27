'use client'

import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useGetMeQuery} from "@/api/usersApi";

const test = {
    "category": "string",
    "closes_at": "2026-07-24T20:25:57.806Z",
    "created_at": "2026-07-24T20:25:57.806Z",
    "description": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "outcomes": [
        {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "label": "string",
            "price": 0.1,
            "volume": 9007199254740991
        }
    ],
    "participants_count": 1073741824,
    "resolved_outcome_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "status": "string",
    "title": "string",
    "total_volume": 9007199254740991
}

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData, TValue> {
        className?: string
    }
}

interface TableProps {
    market: {
        title:string,
        img:string,
        eventName:string,
    },
    avgBuy:number,
    currentEventPrice:number,
    volume:number,
}
const data: TableProps[] = [
    {
        market: {
            title:'US recession in 2025?',
            img:'blabla',
            eventName:'No',
        },
        avgBuy:50,
        currentEventPrice:60,
        volume:200,
    },
    {
        market: {
            title:'US recession in 2025?',
            img:'blabla',
            eventName:'No',
        },
        avgBuy:50,
        currentEventPrice:60,
        volume:200,
    },
    {
        market: {
            title:'US recession in 2025?',
            img:'blabla',
            eventName:'No',
        },
        avgBuy:50,
        currentEventPrice:60,
        volume:200,
    },
    {
        market: {
            title:'US recession in 2025?',
            img:'blabla',
            eventName:'No',
        },
        avgBuy:50,
        currentEventPrice:60,
        volume:200,
    },
    {
        market: {
            title:'US recession in 2025?',
            img:'blabla',
            eventName:'No',
        },
        avgBuy:50,
        currentEventPrice:60,
        volume:200,
    },
]
const columns:ColumnDef<TableProps>[] = [
    {
        accessorKey:'market',
        header:'Market',
        meta:{className:'text-left'},
        cell: ({getValue}) => {
            const m = getValue<TableProps['market']>()
            return (
                <div className='flex items-center gap-3'>
                    <div className='w-12.5 h-12.5 bg-white rounded-md'>
                        <img src={m.img} className='w-8 h-8 rounded-full' />
                    </div>
                    <div>
                        <div>{m.title}</div>
                        <div className='text-text-dark'>{m.eventName}</div>
                    </div>
                </div>
            )
        }
    },
    {accessorKey:'avgBuy',header:'AVG', meta:{className:'text-right w-40'}},
    {accessorKey:'currentEventPrice',header:'CURRENT', meta:{className:'text-right w-40'}},
    {accessorKey:'volume',header:'VOLUME', meta:{className:'text-right w-40'}},
]


export default function List() {
    const {data:user,isLoading,error} = useGetMeQuery()


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel()
    })

    return (
        <div className='pt-10 flex flex-col h-full min-h-0'>
            <div className='flex items-center gap-6'>
                <div className='w-25 h-25 bg-white rounded-full'>
                </div>

                {!isLoading ? <div className='flex flex-col'>
                    <h2>{user?.username}</h2>
                    <span>{user?.id}</span>
                    <span>{user?.email}</span>
                    <span>{user?.avatar_url}</span>
                    <span>{user?.balance}</span>
                    <div className='flex items-center gap-2 mt-2'>
                        <div className='w-4 h-4 bg-green-400'>

                        </div>
                        <span>Online</span>
                    </div>
                </div> : <span>
                    loading
                </span>}

            </div>
            <div className='mt-auto rounded-4xl shadow-component bg-component border-2 border-border-default w-full h-100 overflow-y-auto flex flex-col'>
                <div className='px-4 pt-2.5 border-b-2 border-border-default flex items-center gap-9 text-2xl font-semibold text-text-dark shrink-0'>
                    <button className='hover:text-text pb-6.5'>Positions</button>
                    <button className='hover:text-text pb-6.5'>History</button>
                </div>
                <div className='flex-1 min-h-0 overflow-y-auto no-scrollbar'>
                    <table className='w-full pt-4 min-h-0 table-fixed'>
                        <thead className='sticky top-0 z-10 bg-component'>
                            {table.getHeaderGroups().map(group => (
                                <tr key={group.id}>
                                    {group.headers.map(header => (
                                        <th className={`px-6 py-3 font-normal text-text-dark ${header.column.columnDef.meta?.className ?? ''}`}
                                            key={header.id}>
                                           <span className='uppercase'>{flexRender(header.column.columnDef.header,header.getContext())}</span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className='h-18 py-2.5 even:bg-primary-dark'>
                                    {row.getVisibleCells().map(cell => (
                                       <td className={`px-6 font-semibold text-xl ${cell.column.columnDef.meta?.className ?? ''}`} key={cell.id}>
                                           <span>{flexRender(cell.column.columnDef.cell,cell.getContext())}</span>
                                       </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}