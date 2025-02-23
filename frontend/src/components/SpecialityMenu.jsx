import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-5 py-16 text-gray-800'>
        <h1 className='text-3xl font-medium'>Find by speciality</h1>
       <p className='text-center sm:w-1/3 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus a reprehenderit amet optio tempora earum!</p>
       <div className='flex gap-4 overflow-scroll pt-5 flex-wrap sm:justify-center w-full'>
              {
                specialityData.map((item, index) => (
                  <Link
                  onClick={()=>scrollTo(0,0)}
                  to={`/doctors/${item. speciality}`} key={index} className='flex flex-col items-center gap-2 text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
                   <img className='w-16 sm:w-24 mb-2' src={item.image} alt=''/>
                   <p>{item.speciality}</p>
                  </Link>
                ))
              }
       </div>
  
    </div>
  )
}

export default SpecialityMenu