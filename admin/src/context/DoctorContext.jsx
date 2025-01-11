import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const DoctorContext =createContext()

const DoctorContextProvider=(props)=>{
   const backendUrl=import.meta.env.VITE_BACKEND_URL;
   const[dtoken, setDToken]=useState(localStorage.getItem('dtoken')?localStorage.getItem('dtoken'):null);

   const [appointments,setAppointments]=useState([]);
   const [dashData,setDashData]=useState(false);

   const [profileData, setProfileData]=useState(false);

   const getAppointments = async () => {
    try {
        const { data } = await axios.get(
            backendUrl + '/api/doctor/appointments',
            { headers: { Authorization: `Bearer ${dtoken}` } }
        );

        if (data.success) {
            setAppointments(data.appointments);
            //console.log(data.appointments.reverse());
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error(error.message);
        toast.error(error.message);
    }
};

const completeAppointment = async (appointmentId) => {
    try {
        const { data } = await axios.post(
            backendUrl + `/api/doctor/complete-appointment`,
            { appointmentId },
            {
                headers: {
                    Authorization: `Bearer ${dtoken}`, // Correct header
                },
            }
        );

        if (data.success) {
            toast.success(data.message);
            getAppointments();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};

const cancelAppointment = async (appointmentId) => {
    try {
        const { data } = await axios.post(
            backendUrl + `/api/doctor/cancel-appointment`,
            { appointmentId },
            {
                headers: {
                    Authorization: `Bearer ${dtoken}`, // Correct header
                },
            }
        );

        if (data.success) {
            toast.success(data.message);
            getAppointments();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};

//dashboard data
const getDashData=async()=>{
    try {
        const { data } = await axios.get(
            backendUrl + `/api/doctor/dashboard`,
            {
                headers: {
                    Authorization: `Bearer ${dtoken}`, // Correct header
                },
            }
        );
if (data.success) {
    setDashData(data.dashData)
    console.log(data.dashData);
}else{
    toast.error(data.message)
}
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

const getprofileData = async () => {
    try {
        const { data } = await axios.get(
            backendUrl + `/api/doctor/profile`,
            {
                headers: {
                    Authorization: `Bearer ${dtoken}`, // Correct header
                },
            }
        );

        console.log("Full data response:", data); // Log the full response to debug

        if (data.success) {
            setProfileData(data.message);
            console.log("Profile Data:", data.message); // Log profile data
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
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
   completeAppointment,
   cancelAppointment,
   dashData,getDashData,setDashData,
   profileData,setProfileData,getprofileData
    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;