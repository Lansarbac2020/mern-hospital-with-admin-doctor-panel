import React from 'react'
import { doctors } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const TopDoctors = () => {
    const navigate=useNavigate();
  return (
    <div className='flex flex-col items-center gap-5  my-16 md:mx-10 py-16 text-gray-800'>
        <h1 className='text-3xl font-bold'>Top Doctors</h1>
        <p className='sm:w-1/3 text-sm text-center'>Top doctors in the world Lorem, ipsum dolor.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,10).map((item,index)=>(
                <div onClick={()=>navigate(`/appointment/${item._id}`)}  key={index} className=' border border-blue-200 rounded-xl overflow-hidden
                hover:translate-y-[10px] transition-all duration-500 '>
                    <img className='bg-blue-50' src={item.image} alt=''/>
                    <div className='p-4'>
                        <div className='flex gap-2 text-sm text-center text-green-500 items-center'>
           <p className='w-2 h-2 rounded-full bg-green-500'></p>
         <p className=''>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-bold'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                  
                </div>
            ))}
        </div>
        <button className='bg-primary text-gray-900 hover:scale-105 px-12 py-3 mt-10 rounded-full'>View All</button>
    </div>
  )
}

export default TopDoctors