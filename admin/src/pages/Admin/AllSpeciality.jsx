import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { FaTrashAlt } from 'react-icons/fa';

const AllSpeciality = () => {
    const {speciality, aToken,getAllSpeciality,deleteSpeciality}=useContext(AdminContext);

    useEffect(()=>{
       if(aToken){
        console.log();
         getAllSpeciality()
       }
    },[aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-auto'>
        <h1 className='text-lg font-medium'>
            All Specialities
        </h1>
        <div className='flex flex-wrap gap-4 mt-5 w-full pt-5 gap-y-6'>
             {
                      speciality.map((doctor,index)=>{
                        return(
                          <div
                          className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group '
                          key={index}>
                           <img 
                           className='bg-indigo-50 group-hover:bg-primary transition-all duration-500'
                           src={doctor.image} alt="doctor" />
                           <div className='p-4'>
                           
                            
                            <div className='flex justify-between'>
                            <div className='mt-2 flex items-center gap-1 text-sm'>
                            <p className='text-neutral-800 text-lg font-medium'>{doctor.name}</p>
                            </div> 
                            <p 
                            className=' text-end mt-3 text-primary hover:text-red-900 cursor-pointer'
                            onClick={()=>deleteSpeciality(doctor._id)}
                            ><FaTrashAlt/></p>
            
                            </div>
                            
                            </div>
                            
                          </div>
                        )
                      })
                    }
        </div>
        
    </div>
  )
}

export default AllSpeciality