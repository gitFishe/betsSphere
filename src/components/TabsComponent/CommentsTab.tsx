import {ChatMessage} from "@/types/types";
import {formatMonthYear} from "@/utils/date";

export default function CommentsTab({data}:{data:ChatMessage[]} ) {
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
                {data.map((item:ChatMessage,i) => (
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