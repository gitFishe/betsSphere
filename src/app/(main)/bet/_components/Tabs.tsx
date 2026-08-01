
const TABS = ['comments','activity']

export default function Tabs() {
    return (
        <div>
            <div className='flex'>
                {TABS.map((item,i) => (
                    <button key={i}>{item}</button>
                ))}
            </div>
            <div>

            </div>
        </div>
    )
}