import React from 'react'
import  { assets } from '/src/assets/assets'
import { NavLink } from 'react-router-dom'
const NavBar = () => {

  return (
    <div className='flex justify-between items-center text-md py-4 mb-5 border-b border-b-gray-400'>
        <img src={assets.logo} alt='logo'/>
        <ul>
            <NavLink>
                <li>Home</li>
                <hr/>
            </NavLink>
            <NavLink>
                <li>All Doctors</li>
                <hr/>
            </NavLink>
            <NavLink>
                <li>About</li>
                <hr/>
            </NavLink>
            <NavLink>
                <li>Contact</li>
                <hr/>
            </NavLink>
        </ul>
        <div>
            <button>Sign-up</button>
        </div>
    </div>
  )
}

export default NavBar