import React from 'react'
import User from '../assets/svg/User.svg'
import Exit from '../assets/svg/Exit.svg'
import Logo from '../assets/svg/Logo.svg'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='text-black bg-[#F1F1F1]  flex items-center justify-between p-5'>
        <div className='flex items-center gap-5 text-[#121212]'>
            <Link to={"/result"}><h1 className='font-pacifico text-2xl '>Limited</h1></Link>
            <h2 className='font-bold text-lg'>Restaurant Kitchen</h2>
            <div className=' ' >
                <img src={Logo} alt="logo" />
            </div>
            
        </div>
        <div className='flex items-center gap-5'>
            <div className='flex gap-1'>
                <img src={User} alt="usericon" className='h-5 w-5 object-contain'/>
                <h2 className='text-[#333333]'>Kitchen Staff</h2>
            </div>
            <button className='flex items-center cursor-pointer bg-[#DC2626] p-2 gap-1 rounded-md text-[#F1F1F1]'>
                <img src={Exit} alt="usericon" className='h-5 w-5 object-contain'/>
                <h2>Logout</h2>
            </button>
        </div>
    </div>
  )
}

export default Navbar