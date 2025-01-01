import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import {toast} from 'react-toastify'
export const AppContext = createContext();


const AppcontextProvider = (props) =>
 {
  const currencySymbol='₹';
  const backendUrl=import.meta.env.VITE_BACKEND_URL;

  const [doctors,setDoctors]=useState([]);

  const value={
   doctors,
   currencySymbol
  }

  const getDoctorsData=async()=>{
    try {
      
      const {data}=await axios.get(backendUrl + '/api/doctor/list');
      if (data.success) {
        setDoctors(data.doctors);

      }else{
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message); 
    }
  }

useEffect(()=>{
  getDoctorsData();
},[])

  return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppcontextProvider;