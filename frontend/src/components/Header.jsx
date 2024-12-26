import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/* left */}
        <div className='md:w-1/2 flex flex-col justify-center gap-4 py-10 m:auto md:py-[10vw] md:mb-[-30px] items-start text-white'>
   <p className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight '>Lorem ipsum dolor sit, amet consectetur <br/> With trusted Doctors</p>
   <div className='flex flex-col md:flex-row gap-3 items-center text-white text-sm font-light'>
     <img className='w-28'  src={assets.group_profiles} alt=''/>
     <p>Lorem ipsum dolor sit, amet consectetur rerererer <br className='hidden sm:block'/> With trusted Doctors</p>
   </div>
   <a className='flex items-center gap-2 bg-white px-5 py-3 text-sm
   hover:scale-105 rounded-full text-gray-600
   m-auto translate-all duration-300' href='#speciality' >Get Started <img className='w-3' src={assets.arrow_icon} alt=''/></a>
        </div>
        {/* right */}
        <div className='md:w-1/2 relative'>
            <img className='w-full absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt=''/>
        </div>
    </div>
  )
}

export default Header