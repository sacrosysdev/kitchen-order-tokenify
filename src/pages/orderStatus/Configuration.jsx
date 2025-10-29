import React from 'react'
import { configurationsData } from '../../constants'


const Configuration = () => {
  return (
    <div className='px-5 py-1 bg-[#F1F1F1] border-t border-[#374151] flex justify-between items-center '>
        <div  className='flex items-center gap-4'>
            {configurationsData.map((item)=>(
            <div key={item.id} className='flex items-center gap-2'>
                <img src={item.icon} alt="icon" className='w-5 h-5 object-contain'/>
                <span>{item.title}</span>
            </div>
        ))}
        </div>
        <div className='flex gap-2 items-center'>
            <div className='w-3 h-3 bg-[#4ADE80] rounded-full'></div>
            <h2>Connected to TV</h2>
        </div>
    </div>
  )
}

export default Configuration