'use client'
import {AreaChart, Area, YAxis, XAxis, ReferenceLine, Tooltip, ResponsiveContainer, TooltipContentProps} from 'recharts'

const LINE = '#4ade80'
const GRID = '#414149'
const TICK = '#9898A0'

function ChartTooltip({active, payload, label}:TooltipContentProps) {
    if (!active || !payload?.length) return null

    return (
        <div className='bg-element border border-light-border rounded-lg px-3 py-2 shadow-lg'>
            <div className='text-text text-lg font-semibold'>{payload[0].value}%</div>
            <div className='text-text-dark text-xs mt-0.5'>{label}</div>
        </div>
    )
}

export default function Chart({data}:{data:{t:string,pct:number}[]}) {
    return (
        <ResponsiveContainer width='100%' height={280} className='p-4 rounded-2xl border-3 border-border-default shadow-component'>
            <AreaChart data={data} margin={{top:10,right:0,bottom:0,left:0}}>
                <defs>
                    <linearGradient id='fade' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0%' stopColor={LINE} stopOpacity={0.25}/>
                        <stop offset='100%' stopColor={LINE} stopOpacity={0}/>
                    </linearGradient>
                </defs>

                <YAxis domain={[0,100]} hide/>
                <XAxis dataKey='t' tickLine={false} axisLine={false} tick={{fill:TICK,fontSize:12}}/>

                {[25,50,75].map(y => (
                    <ReferenceLine key={y} y={y} stroke={GRID} strokeDasharray='3 3'/>
                ))}

                <Area
                    type='monotone' dataKey='pct'
                    stroke={LINE} strokeWidth={2}
                    fill='url(#fade)'
                    dot={false} activeDot={{r:5}}
                    animationDuration={800} animationEasing='ease-out'
                />
                <Tooltip content={ChartTooltip} cursor={{stroke:GRID}}/>
            </AreaChart>
        </ResponsiveContainer>
    )
}