import React from 'react'
import PrepareCard from './PrepareCard'

const PreparingOrders = () => {
  return (
    <div>
        <h1 className='uppercase font-bold text-[#121212] text-[20px] pt-2'>Preparing Orders</h1>
        <div className='grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 2xl:grid-cols-12 gap-3 py-3'>
            { Array.from({length:36}).map((_, index)=>(
                <PrepareCard key={index}/>
            )) }
        </div>
    </div>
  )
}

export default PreparingOrders