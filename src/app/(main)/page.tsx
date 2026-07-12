import BetsList from "@/app/(main)/_components/BetsList";
import LiveChat from "@/app/(main)/_components/LiveChat";
import Trending from "@/app/(main)/_components/Trending";

export default function MainPage() {
    return (
        <div className='w-full h-full flex gap-8'>
            <BetsList/>
            <div className='w-full flex flex-col gap-6'>

                <Trending/>
                <LiveChat/>

            </div>
        </div>
    )
}