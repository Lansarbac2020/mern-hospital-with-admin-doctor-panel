import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const SideBar = () => {
    const {aToken}=useContext(AdminContext)
    const {dtoken}=useContext(DoctorContext);



  return (
    <div className='min-h-screen bg-white boorder-r border-gray-600'>
        {
            aToken && <ul className='text-[#515151] mt-5'>
           <NavLink
  className={({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
      isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
    }`
  }
  to={'/admin-dashbard'}
>
  <img src={assets.home_icon} alt='' /><  p  className='hidden md:block'>Dashboard</p>
</NavLink>

                <NavLink
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                      isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                    }`
                  }
                to={'/all-appointments'}><img src={assets.appointment_icon} alt=''/>
                <p className='hidden md:block'>Appointment</p></NavLink>
                <NavLink
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                      isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                    }`
                  }
                
                to={'/add-doctor'}><img src={assets.add_icon} alt=''/> <p className='hidden md:block'>Add Doctor</p></NavLink>
                <NavLink 
                
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                      isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                    }`
                  }
                to={'/doctor-list'}><img src={assets.people_icon} alt=''/><p className='hidden md:block'>Doctors List</p> </NavLink>
                 <NavLink
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                      isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                    }`
                  }
                
                to={'/add-speciality'}><img src={assets.add_icon} alt=''/> <p className='hidden md:block'>Add speciality</p></NavLink>
                
            </ul>
        }
        {
            dtoken && <ul className='text-[#515151] mt-5'>
           <NavLink
  className={({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
      isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
    }`
  }
  to={'/doctor-dashboard'}
>
  <img src={assets.home_icon} alt='' /><p className='hidden md:block'>Dashboard</p>
</NavLink>

                <NavLink
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                      isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                    }`
                  }
                to={'/doctor-appointment'}><img src={assets.appointment_icon} alt=''/>
                <p className='hidden md:block'>Appointments</p>
                </NavLink>
              
                <NavLink 
                
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                      isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
                    }`
                  }
                to={'/doctor-profile'}><img src={assets.people_icon} alt=''/>
                <p className='hidden md:block'>Profile</p>
                </NavLink>
                
            </ul>
        }
    </div>
  )
}

export default SideBar