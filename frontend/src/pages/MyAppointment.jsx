import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const months =['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const slotDateFormat=(slotDate)=>{
    const dateArray= slotDate.split('_');
    return dateArray[0]+ " " + months[Number(dateArray[1])]+" "+dateArray[2];
  }

  // Function to fetch user appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          token,
        },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to fetch appointments.');
    }
  };
const cancelAppointment=async(appointmentId)=>{
  try {
    const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, {
      appointmentId,
    }, {
      headers: {
        token
      },
    });

    if (data.success) {
      toast.success(data.message);
      getUserAppointments();
      getDoctorsData();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
}

const appointmentRazorpay=async(appointmentId)=>{
   try {
    
const  {data}=await axios.post(`${backendUrl}/api/user/payment-razorpay`,{appointmentId},{headers:{token}});

if(data.success){
  console.log(data.order);
}

   } catch (error) {
    
   }
}

  // useEffect to trigger fetching appointments when token changes
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointment</p>
      <div>
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img
                  className="bg-indigo-50 w-32"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address</p>
                <p className="text-xs">{item.docData.line1}</p>
                <p className="text-xs">{item.docData.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-zinc-700 font-medium">Date and Time: </span>
                  {slotDateFormat(item.slotDate)}  | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled &&
                <button 
                // onClick={()=>appointmentRazorpay(item._id)}
                className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all rounded-lg duration-300">
                  Pay online
                </button>}
               {!item.cancelled &&
               <button
                onClick={()=>cancelAppointment(item._id)}
                className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300">
                  Cancel
                </button>}
                {item.cancelled && <p className=" text-sm text-center text-red-600">Cancelled</p>}

          
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-zinc-500 mt-4">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointment;