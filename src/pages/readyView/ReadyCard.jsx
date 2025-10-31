import React from 'react'

const ReadyCard = ({ tokenNo }) => {
  return (
    <div className='bg-[#16A34A] text-white flex justify-center items-center rounded-xl shadow-xl h-20'>
        <h2 className='font-bold text-xl'>#{tokenNo}</h2>
    </div>
  )
}

export default ReadyCard