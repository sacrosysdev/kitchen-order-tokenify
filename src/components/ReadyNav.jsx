import React from 'react'

import Logo from '../assets/svg/Logo.svg'
import { Link } from 'react-router-dom'

const ReadyNav = () => {
    return (
        <div className='text-black bg-[#F1F1F1] border-b border-[#404040] flex items-center justify-between py-2 px-5'>
            <div className='flex items-center gap-5 text-[#121212]'>
                <div className="bg-linear-to-r from-[#F97316] to-[#EF4444] font-pacifico w-12 h-12 2xl:w-16 2xl:h-16 rounded-full flex justify-center items-center">
                    <span className='text-xl'>l</span>
                </div>

                <div className='flex flex-col'>
                    <Link to={"/status"}><h1 className='font-pacifico text-2xl 2xl:text-[32px] cursor-pointer'>.Limited</h1></Link>
                    <h2 className='font-light text-[16px]'>Quality Food, Quick Service</h2>
                </div>

            </div>
            <div className='flex items-center gap-3'>

                <div className=' ' >
                    <img src={Logo} alt="logo" />
                </div>

                <div className='flex  font-bold'>
                    <span className='text-sm'>Now Serving</span>
                </div>

                <div className='flex  font-bold'>
                    <span className='text-[24px]'>07:31 PM</span>
                </div>
            </div>
        </div>
    )
}

export default ReadyNav