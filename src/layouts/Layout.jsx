import React from 'react'
import Navbar from '../components/Navbar'
import SearchSection from '../components/SearchSection'

const Layout = ({children}) => {
  return (
    <div className='font-poppins bg-[#F1F1F1] min-h-screen pb-10'>
        <Navbar/>
        <SearchSection/>
        <div className=' py-2'>
            {children}
        </div>
    </div>
  )
}

export default Layout