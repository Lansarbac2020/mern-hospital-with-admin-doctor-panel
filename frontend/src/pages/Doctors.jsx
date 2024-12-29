import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Doctors = () => {
const [fliterDoc, setFilterDoc]=useState([]);
const [showFilter,setShowFilter]=useState(false);

const navigate=useNavigate();
const applyFilter=()=>{
  if(speciality){
  
    setFilterDoc(doctors.filter(doc=>doc.speciality===speciality));
  }
  else{
    setFilterDoc(doctors);
  }
}
  const {speciality}=useParams();
 // console.log(speciality);
 const {doctors}=useContext(AppContext);

useEffect(()=>{
 applyFilter();
},[doctors,speciality])
  return (
    <div>
      <p className='text-gray-600'>Browse throu Lorem ipsum dolor sit amet.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 '>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter?'bg-primary text-white':''}`}
        onClick={()=>setShowFilter(prev=>!prev)}>filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 cursor-pointer ${showFilter ? 'flex':'hidden sm:flex'} `}>
          <p  onClick={()=>speciality==='General%20physician' ? navigate('/doctors') : navigate('/doctors/General%20physician')} className={`w-[94vw] sm:w-auto pl-1.5 border-gray-300 py-1.5 pr-16 border ${speciality ==="General%20physician" ? "bg-indigo-100 text-black" :""}`}>General Physician</p>
          <p  onClick={()=>speciality==='Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}   className={`w-[94vw] sm:w-auto pl-1.5 border-gray-300 py-1.5 pr-16 border ${speciality ==="Gynecologist" ? "bg-indigo-100 text-black" :""}`}>Gynecologist</p>
          <p   onClick={()=>speciality==='Dermatologist' ? navigate('/doctors/') : navigate('/doctors/Dermatologist')}  className={`w-[94vw] sm:w-auto pl-1.5 border-gray-300 py-1.5 pr-16 border ${speciality ==="Dermatologist" ? "bg-indigo-100 text-black" :""}`}>Dermatologist</p> 
       
          <p  onClick={()=>speciality==='Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}   className={`w-[94vw] sm:w-auto pl-1.5 border-gray-300 py-1.5 pr-16 border ${speciality ==="Pediatricians" ? "bg-indigo-100 text-black" :""}`}>Pediatricians</p>
          <p   onClick={()=>speciality==='Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}  className={`w-[94vw] sm:w-auto pl-1.5 border-gray-300 py-1.5 pr-16 border ${speciality==="Neurologist"?"bg-indigo-100 text-black":""}`}>Neurologist</p>
          <p   onClick={()=>speciality==='' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}  className={`w-[94vw] sm:w-auto pl-1.5 border-gray-300 py-1.5 pr-16 border ${speciality==="Gastroenterologist" ?"bg-indigo-100": ""}`}>Gastroenterologist</p>

        </div>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 '>
          {
         fliterDoc.map((item,index)=>(
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
      ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors