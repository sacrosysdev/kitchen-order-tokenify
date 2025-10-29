import React from 'react'
import PrepareCard from './PrepareCard'
import Waiting from '../../assets/svg/Waiting.svg'

const PreparingOrders = () => {
  return (
    <div>
        <div className='flex items-center gap-3 pt-3'>
                  <h1 className='uppercase font-bold  text-[#404040] text-[20px] '>Preparing Orders</h1>
                  <img src={Waiting} alt="Waiting" className='h-8 w-8 object-contain'/>
                </div>
        <div className='grid grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-3 py-3'>
            { Array.from({length:36}).map((_, index)=>(
                <PrepareCard key={index}/>
            )) }
        </div>
    </div>
  )
}

export default PreparingOrders