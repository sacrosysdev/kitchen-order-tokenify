import React from 'react'
import PrepareCard from './PrepareCard'

const PreparingOrders = () => {
  return (
    <div>
        <h1 className='uppercase font-bold text-[#121212] text-2xl'>Preparing Orders</h1>
        <div className='grid grid-cols-6 lg:grid-cols-9 gap-3 py-5'>
            { Array.from({length:40}).map((_, index)=>(
                <PrepareCard key={index}/>
            )) }
        </div>
    </div>
  )
}

export default PreparingOrders