import React from 'react'
import Navbar from '../components/Navbar'
import SearchSection from '../components/SearchSection'

const Layout = ({children}) => {
  return (
    <div className='font-poppins bg-[#F1F1F1] min-h-screen'>
        <Navbar/>
        <SearchSection/>
        <div className='p-5'>
            {children}
        </div>
    </div>
  )
}

export default Layout