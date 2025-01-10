import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const DoctorContext =createContext()

const DoctorContextProvider=(props)=>{
   const backendUrl=import.meta.env.VITE_BACKEND_URL;
   const[dtoken, setDToken]=useState(localStorage.getItem('dtoken')?localStorage.getItem('dtoken'):null);

   const [appointments,setAppointments]=useState([]);

   const getAppointments = async () => {
    try {
        const { data } = await axios.get(
            backendUrl + '/api/doctor/appointments',
            { headers: { Authorization: `Bearer ${dtoken}` } }
        );

        if (data.success) {
            setAppointments(data.appointments.reverse());
            console.log(data.appointments.reverse());
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error(error.message);
        toast.error(error.message);
    }
};


    const value={
   backendUrl, 
   dtoken,
   setDToken,
   appointments,
   setAppointments,
   getAppointments,
    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;