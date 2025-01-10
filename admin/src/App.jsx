import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllApointment from './pages/Admin/AllApointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';


const Admin = () => {

  const {aToken}=useContext(AdminContext)
  const {dtoken}=useContext(DoctorContext);



  return aToken || dtoken ? (
    <div  className='bg-[#F8F9FD]'>
     
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <SideBar/>
        <Routes>
          {/* AdminRoutes */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashbard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllApointment/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorsList/>}/>
             {/* DoctorRoutes */}
             <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
             <Route path='/doctor-appointment' element={<DoctorAppointment/>}/>
             <Route path='/doctor-profile' element={<DoctorProfile/>}/>
        </Routes>
      </div>
    </div>
  ):(
    <>
     <Login/>

     <ToastContainer/>
    </>
  )
}

export default Admin