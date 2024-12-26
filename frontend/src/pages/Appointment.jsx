import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {AppContext} from '../context/AppContext';
import { assets } from '../assets/assets';
const Appointment = () => {

  const {docId}=useParams();
  const {doctors,currencySymbol}=useContext(AppContext);

  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT'];

  const [docInfo,setDocInfo]=useState(null);
  const  [docSlots,setDocSlots]=useState([]);
  const [slotIndex,setSlotIndex]=useState(0);
  const [slotTime,setSlotTime]=useState('');
 
  const fetchDocInfo=async()=>{
     const docInfo=doctors.find(doc=>doc._id===docId);
     setDocInfo(docInfo);
    /// console.log(docInfo);
  }

  const getAvailableSlots=async(date)=>{
    setDocSlots([]);
    //get current date
    let today=new Date();
    for (let i=0; i<7; i++){
      //get date with index
      let currentDate=new Date(today);
      currentDate.setDate(today.getDate()+i);
      //setting endtime of the date index
      let endTime=new Date();
      endTime.setDate(today.getDate()+i);
      endTime.setHours(21,0,0,0);
      //setting hours
      if (today.getDate()===currentDate.getDate())
        {
        currentDate.setHours(currentDate.getHours()>10 ? currentDate.getHours()+1 :10);
        currentDate.setMinutes(currentDate.getMinutes()>=30 ? 0 : 30);
        }
        else{
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }
        let timeSlot=[];

        while(currentDate<endTime){
          let formattedTime =currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

           //add slot to timeSlot array
          timeSlot.push({
            datetime: new Date(currentDate),
            time:formattedTime,
          })
          //incrementing time by 30 minutes
          currentDate.setMinutes(currentDate.getMinutes()+30);
        }
        //set slots
        setDocSlots(prev=>([...prev,
          ...timeSlot]));

      // let date=new Date(today);
      // date.setDate(today.getDate()+i);
      // let day=date.toLocaleString('default',{weekday:'long'});
      // let daySlots=docInfo?.slots[day];
      // if(daySlots){
      //   let slots=daySlots.map(slot=>({
      //     time:slot,
      //     date:date.toDateString()
      //   }))
      //   setDocSlots(prev=>[...prev,...slots]);
      // }
    }
  }
  //fetching doctor info
  useEffect(()=>{
    fetchDocInfo();
  },[doctors,docId])
//to get available slots
  useEffect(()=>{ 
   getAvailableSlots();
  },[docInfo])

  //to select slot
  useEffect(()=>{
   console.log(docSlots);
  },[docSlots])
  return docInfo && (
    <div >
      {/* doctor details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg ' src={docInfo?.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg py-7 p-8 bg-white mx-2 sm:mt-0'>
          {/* doctor name, degree, description */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo?.name} <img className='w-5' src={assets.verified_icon} alt='verifiedicon'/></p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo?.degree} - {docInfo?.speciality}</p>
            <button className='py-0.5 px-2 border text-xs  rounded-full'>{docInfo?.experience}</button>
          </div>
          {/* doctor about */}
         
          <div>
            <p className='flex items-center gap-1 text-sm text-gray-900 mt-3 font-medium'>About <img src={assets.info_icon} alt=''/>
            </p>
            <p className='text-sm max-w-[500px] text-gray-600 mt-1'>{docInfo?.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>Appointment fee : <span className='text-gray-600'>{currencySymbol} {docInfo?.fees}</span></p>
        </div>
        
      </div>
      {/* appointment slots */}
   {/* Booking Slots */}
<div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
  <p className="text-lg font-semibold">Booking Slots</p>
  <div>
    {Array.from({ length: 7 }).map((_, dayIndex) => {
      const today = new Date();
      const day = new Date(today.setDate(today.getDate() + dayIndex)); // Get the next 7 days
      const daySlots = docSlots.filter(
        (slot) =>
          slot.datetime.toDateString() === day.toDateString() // Filter slots for the current day
      );

      return (
        <div key={dayIndex} className="my-4">
          {/* Display Day Name and Date */}
          <p className="font-bold text-gray-800">
            {daysOfWeek[day.getDay()]} 
          </p>
          <p className='text-sm text-gray-800'>
          {day.toDateString().slice(7, 10)}
          </p>

         
        </div>
      );
    })}
  </div>
</div>

    </div>
  )
}

export default Appointment