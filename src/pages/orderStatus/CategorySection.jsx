import React, { useState } from 'react'
import Preparing from '../../assets/svg/Preparing.svg'
import Ready from '../../assets/svg/Ready.svg'
import Completed from '../../assets/svg/Completed.svg'

const CategorySection = ({activeCategory, setActiveCategory}) => {

  const handleCategory = (id)=>{
          setActiveCategory(id)
      }
    
const categories = [
  { id: 'preparing', label: 'Preparing', icon: Preparing, count: 4 },
  { id: 'ready', label: 'Ready', icon: Ready, count: 4 },
  { id: 'collected', label: 'Collected', icon: Completed, count: 2 }
];
  return (
    <div className=' flex gap-3 w-fit' >
        {categories.map((item)=>(
          <div key={item.id} className='flex items-center gap-2 bg-[#FAFAFA] px-5'>

            <div 
                
                onClick={()=>{handleCategory(item.id)}} 
                className={`flex gap-1 py-2 border-b-2 hover:border-green-500 items-center cursor-pointer transition-all duration-300 ease-in-out ${
                    item.id === activeCategory 
                        ? " border-green-500" 
                        : " border-transparent"
                }`}
            >
                <img src={item.icon} alt="icon" className='h-6 w-6'/>
                <h2 className='font-semibold text-sm'>{item.label}</h2>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out 
                ${item.id === activeCategory
                  ? "bg-[#3ABC4F14] border border-[#3ABC4F] rounded-full w-8 h-8 flex justify-center items-center 100"
                  : "border border-transparent rounded-full w-8 h-8 flex justify-center items-center scale-90"}
              `}
            >
              {item.count > 0 && (
                <span className="p-2 transition-all duration-300 ease-in-out">{item.count}</span>
              )}
            </div>
          </div>
            
        ))}
    </div>
  )
}

export default CategorySection