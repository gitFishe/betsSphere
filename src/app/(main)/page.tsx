import BetsList from "@/app/(main)/_components/BetsList";
import LiveChat from "@/app/(main)/_components/LiveChat";
import Trending from "@/app/(main)/_components/Trending";

export default function MainPage() {
    return (
        <div className='w-full h-full flex gap-8'>
            <BetsList/>
            <div className='flex flex-col gap-6 w-100 shrink-0'>
                <Trending/>
                <LiveChat/>
            </div>
        </div>
    )
}