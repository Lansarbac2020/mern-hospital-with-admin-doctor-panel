import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/Appcontext.jsx'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({docId,speciality}) => {

    const {doctors}=useContext(AppContext);
    const navigate=useNavigate();
    //console.log(doctors);
    const [relatedDocs,setRelatedDocs]=useState([]);
    
    useEffect(()=>{
       if(doctors.length>0 && speciality)
        {
           const doctorsData=doctors.filter((doc)=>doc.speciality===speciality && doc._id!==docId);
           setRelatedDocs(doctorsData);
       }
    },[doctors,docId,speciality])

  return (
    <div className='flex flex-col items-center gap-5  my-16 md:mx-10 py-16 text-gray-800'>
    <h1 className='text-3xl font-bold'>Related Doctors</h1>
    <p className='sm:w-1/3 text-sm text-center'>Top doctors in the world Lorem, ipsum dolor.</p>
    <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relatedDocs.slice(0,5).map((item,index)=>(
            <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0);}}  key={index}className=' border border-blue-200 rounded-xl overflow-hidden
            hover:translate-y-[10px] transition-all duration-500 '>
                <img className='bg-blue-50' src={item.image} alt=''/>
                <div className='p-4'>
                <div className={`flex gap-2 text-sm text-center ${item.available?'text-green-500':"ttext-gray-800"
                            
                        } items-center`}>
           <p className={`w-2 h-2 ${item.available? 'bg-green-500':'bg-gray-500'}rounded-full `}></p>
         <p className=''>{item.available?"Available":"Not available"}</p>
                        </div>
                    <p className='text-gray-900 text-lg font-bold'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              
            </div>
        ))}
    </div>
    <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-primary text-gray-900 hover:scale-105 px-12 py-3 mt-10 rounded-full'>View All</button>
</div>
  )
}

export default RelatedDoctors