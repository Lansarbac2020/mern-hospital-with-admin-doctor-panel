import React from 'react'
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { useEffect } from 'react';

const DoctorAppointment = () => {

  const {dtoken,appointments,getAppointments,}=useContext(DoctorContext);

  useEffect(()=>{
    if(dtoken){
      getAppointments()
    }
  },[dtoken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid gap-1 grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
     <p>#</p>
     <p>Patients</p>
     <p>Payments Status</p>
     <p>Age</p>
     <p>Date& Time</p>
     <p>Fees</p>
     <p>Actions</p>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointment