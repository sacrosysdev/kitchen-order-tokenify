import React from 'react'
import ReadyNav from '../components/ReadyNav'
import Bg from '../assets/images/ResultBg.jpg'

const ResultLayout = ({children}) => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat font-montserrat relative pb-14"
        style={{ backgroundImage: `url(${Bg})` }}>
        <ReadyNav/>
        <div className='absolute inset-0 bg-white/10 pointer-events-none'></div>
        <div className=''>
            {children}
        </div>
    </div>
  )
}

export default ResultLayout