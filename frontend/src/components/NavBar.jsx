import React, {useState} from 'react'
import  { assets } from '/src/assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
const NavBar = () => {


     const navigate=useNavigate();
     const [showMenu, setShowMenu] = useState(false);
    const [token , setToken] = useState(true); //if token its login

  return (
    <div className='flex justify-between items-center text-md py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>navigate('/')} src={assets.logo} alt='logo' className='w-44 cursor-pointer'/>
        <ul className='hidden md:flex gap-5 font-medium justify-between w-1/3'>
            <NavLink to='/'>
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'> Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>About</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex gap-4 items-center'>
            {
                token ? <div className='flex gap-2 items-center group relative cursor-pointer' >
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt=''/>
                    <img className='w-2.5' src={assets.dropdown_icon} alt=''/>
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-400 z-20 hidden group-hover:block '>
                        <div className=' min-w-48  bg-stone-100 rounded flex flex-col gap-4  p-4'>
                            <p onClick={()=>navigate('/my-profile')}className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={()=>navigate('/my-appointment')}className='hover:text-black cursor-pointer'>My Appointments</p >
                            <p onClick={()=>setToken(false)}className='hover:text-black cursor-pointer'>My Logout</p>
                        </div>
                    </div>
                </div>
                : <button onClick={()=>navigate('/login')} className='bg-primary text-white py-3 px-8 rounded-full font-light hidden md:block'>Sign-up</button>
            }
          <img src={assets.menu_icon}
          className='w-6 md:hidden cursor-pointer 
          '
          alt='' onClick={()=>setShowMenu(true)}/>
          {/* mobile view */}
          <div className={ ` ${showMenu?'fixed w-full ':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex justify-between items-center p-5'>
                <img className='w-36' src={assets.logo} alt="" />
                <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
            </div>
            <ul className='flex flex-col gap-5 items-center text-lg font-medium mt-5'>
                <NavLink className='inline-block px-4 py-2 rounded' onClick={()=>setShowMenu(false)} to='/'><p>HOME</p></NavLink>
                <NavLink className='inline-block px-4 py-2 rounded' onClick={()=>setShowMenu(false)} to='/doctors'><p>ALL DOCTORS</p></NavLink>
                <NavLink className='inline-block px-4 py-2 rounded' onClick={()=>setShowMenu(false)} to='/about'><p>ABOUT</p></NavLink>
                <NavLink className='inline-block px-4 py-2 rounded' onClick={()=>setShowMenu(false)} to='/contact'><p>CONTACT</p></NavLink>
            </ul>
          </div>
           
        </div>
    </div>
  )
}

export default NavBar