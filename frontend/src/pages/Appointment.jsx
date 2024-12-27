import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {AppContext} from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
const Appointment = () => {

  const {docId}=useParams();
  const {doctors,currencySymbol}=useContext(AppContext);

  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT'];

  const [docInfo,setDocInfo]=useState(null);
  const  [docSlots,setDocSlots]=useState([]);
  const [slotIndex,setSlotIndex]=useState(0);
  const [slotTime,setSlotTime]=useState('');
  const [dates, setDates] = useState([]);
 
  const fetchDocInfo=async()=>{
     const docInfo=doctors.find(doc=>doc._id===docId);
     setDocInfo(docInfo);
    /// console.log(docInfo);
  }

  const getAvailableSlots = async() => {
    let groupedSlots = [];
    let today = new Date();
    
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);
      
      if (i === 0) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() >= 30 ? 0 : 30);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let daySlots = [];
      while (currentDate < endTime) {
        daySlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      groupedSlots.push(daySlots);
    }
    setDocSlots(groupedSlots);
  };
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
  useEffect(() => {
    const today = new Date();
    const nextSevenDays = Array.from({length: 7}, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
    setDates(nextSevenDays);
  }, []);
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
    <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-400'>
        <p>Available Slots</p>
        <div className='flex gap-3 items-center mt-3 w-full overflow-x-scroll'>
          {dates.map((date, index) => (
            <div 
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index ? "bg-primary text-white" : "border border-gray-200"
              }`}
            >
              <p>{daysOfWeek[date.getDay()]}</p>
              <p>{date.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex gap-3 items-center mt-4 w-full overflow-x-scroll'>
          {
            docSlots.length && docSlots[slotIndex].map((item,index)=>(
          
              <p 
              onClick={()=>setSlotTime(item.time)}
              className={`text-sm  font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime?"bg-primary text-white":"border border-gray-300"}`}  key={index}>{item.time}
              </p>
            ))
          }
        </div>
        <button className='bg-primary text-white py-3 px-8 rounded-full mt-4 my-6'>Book an appointment</button>
      </div>
      {/* related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality}/>
    </div>
  );
}

export default Appointment