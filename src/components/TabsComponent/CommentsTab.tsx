import {ChatMessage} from "@/types/types";
import {formatMonthYear} from "@/utils/date";

const DATA:ChatMessage[] = [
    {
        id:'1',
        author:{
            id:'u1',
            username:'cryptowhale',
            avatar_url:null
        },
        body:'NBER never declares it in real time, they backdate by 6+ months. This resolves NO on a technicality.',
        created_at:'2026-07-28T14:12:03.000Z'
    },
    {
        id:'2',
        author:{
            id:'u2',
            username:'m_stevens',
            avatar_url:null
        },
        body:'Yield curve has been inverted for 14 months straight. 69% feels low honestly.',
        created_at:'2026-07-29T09:41:22.000Z'
    },
    {
        id:'3',
        author:{
            id:'u3',
            username:'anon_trader',
            avatar_url:null
        },
        body:'just took 500 on Yes, see you in december',
        created_at:'2026-07-31T18:05:47.000Z'
    },
    {
        id:'3',
        author:{
            id:'u3',
            username:'anon_trader',
            avatar_url:null
        },
        body:'just took 500 on Yes, see you in december',
        created_at:'2026-07-31T18:05:47.000Z'
    },
    {
        id:'3',
        author:{
            id:'u3',
            username:'anon_trader',
            avatar_url:null
        },
        body:'just took 500 on Yes, see you in december',
        created_at:'2026-07-31T18:05:47.000Z'
    }
]

export default function CommentsTab() {
    return (
        <div className='relative'>
            <div className='flex items-center h-10 gap-5 sticky my-3'>
                <div className='w-10 h-10 bg-white rounded-lg shrink-0'></div>
                <div className='h-10 w-full bg-element'>
                    <input/>
                </div>
                <button className='py-3 px-6 bg-button-purple'>
                    <span>Post</span>
                </button>
            </div>
            <div className='overflow-y-auto'>
                {DATA.map((item,i) => (
                    <div key={i} className='flex gap-4 py-3'>
                        <div className='w-10 h-10 bg-white rounded-lg shrink-0'></div>
                        <div>
                            <div className='flex gap-4'>
                                <span className='text-sm text-text'>{item.author.username}</span>
                                <span className='text-text-dark text-xs'>{formatMonthYear(item.created_at)}</span>
                            </div>
                            <p className='text-sm text-text'>{item.body}</p>
                            <div className='flex items-center text-xs mt-1 gap-3'>
                                <div className='w-3 h-3 bg-gray-500'></div>
                                <button>Reply</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}