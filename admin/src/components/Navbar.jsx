import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

    const {aToken, setAToken}=useContext(AdminContext) 
    const navigate= useNavigate();

    const logout=()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }
  return (
    <div className='flex py-5 justify-between items-center px-4 border-b sm:px-10 bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt=''/>
            <p className='text-zinc-500 border px-2.5 py-0.5 rounded-full'>{aToken ? "Admin" : "Doctor"}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white px-10 py-2 rounded-full text-sm'>Logout</button>
    </div>
  )
}

export default Navbar