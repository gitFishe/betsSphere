const ProfileInfoBlock = ({
   title,number,smallTitle
}:{
    title:string,number:number,smallTitle?:string
}) => <div className='bg-component flex flex-col px-4 py-3 rounded-2xl min-w-30 gap-2'>
    <span className='text-xs text-text-dark'>{title}</span>
    <h3 className='text-2xl text-text font-bold'>{number}</h3>
    {smallTitle ? <span>{smallTitle}</span> : ''}
</div>

export default ProfileInfoBlock