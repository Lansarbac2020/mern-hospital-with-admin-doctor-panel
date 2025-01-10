import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext =createContext()

const AdminContextProvider=(props)=>{

    const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):null);
    //get all doctors states
    const [doctors,setDoctors]=useState([]);
    //get all apppointment
    const [appointments,setAppointments]=useState([]);
    const [dashData,setDashData]=useState(false);

    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const getAllDoctors=async()=>{
        try {
            
   const {data} =await axios.post(backendUrl + '/api/admin/all-doctors',{},{headers:{aToken}});
    
   if(data.success){
     setDoctors(data.doctors);
     console.log(data.doctors);
   }else{
    toast.error(data.message);
   }
 } catch (error) {
            toast.error(error.message);
        }
    }

const changeAvailability=async(docId)=>{
    try {
        const {data} =await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{aToken}});
        if(data.success){
            toast.success(data.message);
            getAllDoctors();
        }else{
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
}

const getAllAppointments=async()=>{
    try {
        const {data} = await axios.get(backendUrl + '/api/admin/appointments',{headers:{aToken}});
        if(data.success){
            setAppointments(data.appointments);
            console.log(data.appointments);
            //toast.success(data.message);
        }
        else{
            toast.error(data.message);
        }


    } catch (error) {
        toast.error(error.message);
    }
}


const cancelAppointment=async(appointmentId)=>{
     try {
        
   const {data}=await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}});

   if(data.success){
    toast.success(data.message)
    getAllAppointments();
   }else{
    toast.error(data.message);
   }

     } catch (error) {
        toast.error(error.message);
     }
}

//get dashboard data
const getDashData = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } });
    
        // Check if data and success are valid and that dashData exists
        if (data?.success && data?.data) { 
            setDashData(data.data); // 'data' is the object containing 'dashData'
            //console.log("Dashboard Data:", data.data);
        } else {
            // Handle case where success is false or dashData is missing
            toast.error(data?.message || "Unexpected response from server");
        }
    } catch (error) {
        // Handle any errors during the API call
        console.error("Error fetching dashboard data:", error);
        toast.error(error?.message || "Error fetching dashboard data");
    }
};


    const value={
    aToken,setAToken,backendUrl,doctors,getAllDoctors,changeAvailability,appointments, setAppointments,getAllAppointments,
    cancelAppointment,dashData,getDashData
    }

    return(
    <AdminContext.Provider value={value}>
            {props.children}
     </AdminContext.Provider>
    )
}

export default AdminContextProvider;