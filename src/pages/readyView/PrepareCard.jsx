import React from 'react'

const PrepareCard = ({ tokenNo }) => {
  return (
    <div className='bg-[#D1D5DB] text-white flex justify-center items-center rounded-xl shadow-lg h-20 ' 
    
    >
        <h2 className='font-bold text-xl text-[#121212]'>#{tokenNo}</h2>
    </div>
  )
}

export default PrepareCard