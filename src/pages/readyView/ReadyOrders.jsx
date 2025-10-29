import React from 'react'
import ReadyCard from './ReadyCard'

const ReadyOrders = () => {
  return (
    <div>
        <h1 className='uppercase font-bold text-xl text-[#121212]'>Ready for pickup</h1>
        <div className='grid grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-3 py-3'>
            { Array.from({length:36}).map((_, index)=>(
                <ReadyCard key={index}/>
            )) }
        </div>
    </div>
  )
}

export default ReadyOrders