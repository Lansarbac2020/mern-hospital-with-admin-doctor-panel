import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Login = () => {

  const [state, setState] = useState('Sign up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
   <form className='min-h-[80vh] flex items-center'>
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-96 rounded-lg shadow-lg bg-white border border-gray-200'>
      <p className='text-2xl font-semibold'>{state==='Sign up' ? 'Create an account' : 'Login'}</p>
      <p>Please {state==='Sign up' ? 'sign up' : 'login'} to book an appointment</p>
      {
        state==='Sign up' && <div className='w-full'>
        <p>Full Name</p>
        <input className='border border-zinc-200 rounded w-full p-2 mt-1' type='text' value={name} onChange={(e)=>setName(e.target.value)} />
      </div>
      }
      
      <div className='w-full'>
        <p>Email</p>
        <input className='border border-zinc-200 rounded w-full p-2 mt-1' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input className='border border-zinc-200 rounded w-full p-2 mt-1' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
      </div>
      
<button className='bg-primary text-white w-full py-2 rounded-md text-base hover:scale-105'>{state==='Sign up' ? 'Sign up' : 'Login'}</button>
{
  state==='Sign up'? (
    <div className='flex items-center gap-2 text-sm text-gray-600'>
      Already have an account?
      <span 
      onClick={()=>setState('Login')}
      className='text-primary underline cursor-pointer'>Login</span>
    
    </div>
  ) : <p>Create a new account <span
  onClick={()=>setState('Sign up')}
  className='text-primary underline cursor-pointer'>Sign-up</span></p>
 
}
    </div>
   </form>
  );
};

export default Login;