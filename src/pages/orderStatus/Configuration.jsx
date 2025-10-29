import React from 'react'
import { configurationsData } from '../../constants'


const Configuration = () => {
  return (
    <div className='px-2 py-1 bg-[#F1F1F1] flex justify-start items-center gap-4'>
        {configurationsData.map((item)=>(
            <div key={item.id} className='flex items-center gap-2'>
                <img src={item.icon} alt="icon" className='w-5 h-5 object-contain'/>
                <span>{item.title}</span>
            </div>
        ))}
    </div>
  )
}

export default Configuration