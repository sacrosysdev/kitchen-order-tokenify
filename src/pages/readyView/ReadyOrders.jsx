import React from 'react'
import ReadyCard from './ReadyCard'
import Delivery from '../../assets/svg/Delivery.svg'

const ReadyOrders = () => {
  return (
    <div>
        <div className='flex items-center gap-3'>
          <h1 className='uppercase font-bold  text-[#404040] text-[20px] '>Ready for pickup</h1>
          <img src={Delivery} alt="delivery" className='h-8 w-8 object-contain'/>
        </div>
        <div className='grid grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-3 py-3'>
            { Array.from({length:30}).map((_, index)=>(
                <ReadyCard key={index}/>
            )) }
        </div>
    </div>
  )
}

export default ReadyOrders