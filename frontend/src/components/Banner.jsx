import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate =useNavigate();
  return (
    <div className='flex 
    md:mx-10
    flex-wrap bg-primary my-20 rounded-lg px-6 sm:px-10 lg:px-20'>
        {/* left */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight text-white'>
                <p>Make an appointment</p>
                <p className='mt-4'>With  100+ trusted Doctors</p>
          
            </div>
            <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className='bg-white text-base text-gray-600
            py-3 hover:scale-105 px-8
            transition-all duration-300
            mt-10 rounded-full'>Get Started</button>
        </div>
        {/* right */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt=''/>
        </div>
    </div>
  )
}

export default Banner