import React from 'react'
import ReadyNav from '../components/ReadyNav'
import BgVideo from '../assets/images/ResultBg.mp4'

const ResultLayout = ({children}) => {
  return (
    <div className="min-h-screen font-montserrat relative pb-14 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src={BgVideo} type="video/mp4" />
        </video>
        <ReadyNav/>
        <div className='absolute inset-0 bg-white/10 pointer-events-none'></div>
        <div className=''>
            {children}
        </div>
    </div>
  )
}

export default ResultLayout