import React from 'react'

const ThanksCard = ({onOpenModal}) => {
  return (
    <div className='px-10 py-1 backdrop-blur-sm bg-black/10 flex justify-between items-center'>
        <p className='font-semibold text-white text-xl w-3/4'>Thanks for hanging in there! Your order's being made with love. Keep an eye on the display for updates!</p>
        <button className='bg-red-600 px-5 py-2 text-white rounded-2xl cursor-pointer' onClick={onOpenModal}>open modal</button>
    </div>
  )
}

export default ThanksCard