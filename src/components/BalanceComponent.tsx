export default function BalanceComponent({balance}:{balance:number | undefined}) {
    return (
        <div className='h-25 p-7 flex items-center bg-button-purple rounded-2xl border-[#43436B] border-2 gap-13'>
            <div className='flex flex-col'>
                <span className='text-text-dark text-xs'>BALANCE</span>
                <h3 className='text-2xl font-bold text-text'>${balance}</h3>
            </div>
            <div className='flex ml-auto gap-3'>
                <BalanceBtn title='Deposit'/>
                <BalanceBtn title='Withdraw'/>
            </div>
        </div>
    )
}

const BalanceBtn = ({title,darkBg = false}:{title:string,darkBg?:boolean}) => (
    <button className={`px-4 py-2 rounded-lg ${darkBg ? 'bg-white/16' : 'bg-black/28'}`}>{title}</button>
)