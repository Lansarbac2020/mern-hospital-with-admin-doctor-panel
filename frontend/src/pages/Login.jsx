import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

const {token,setToken,backendUrl} =useContext(AppContext);
const navigate= useNavigate();
  const [state, setState] = useState('Sign up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
 

  const onSubmitHandler = async (e) => {
    e.preventDefault();
       try {
        if(state==='Sign up')
          {
            const {data}=await axios.post(backendUrl + '/api/user/register',{name,email,password});
            if(data.success)
            {
              localStorage.setItem('token',data.token);
              setToken(data.token);
              toast.success(data.message);
            }else{
              toast.error(data.message);
            }
          }
          else{
            const {data}=await axios.post(backendUrl + '/api/user/login',{email,password});
            if(data.success)
            {
              localStorage.setItem('token',data.token);
              setToken(data.token);
              toast.success(data.message);
            }else{
              toast.error(data.message);
            }
          }
        
       } catch (error) {
        toast.error(error.message);
       }
  };


  useEffect(() => {
    //if token(login) is present redirect to home page
    if(token)
    {
      navigate('/')
    }
  },[token])
  return (
   <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-96 rounded-lg shadow-lg bg-white border border-gray-200'>
      <p className='text-2xl font-semibold'>{state==='Sign up' ? 'Create an account' : 'Login'}</p>
      <p>Please {state==='Sign up' ? 'sign up' : 'login'} to book an appointment</p>
      {
        state==='Sign up' && <div className='w-full'>
        <p>Full Name</p>
        <input className='border border-zinc-200 rounded w-full p-2 mt-1' type='text' value={name} onChange={(e)=>setName(e.target.value)} required/>
      </div>
      }
      
      <div className='w-full'>
        <p>Email</p>
        <input className='border border-zinc-200 rounded w-full p-2 mt-1' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input className='border border-zinc-200 rounded w-full p-2 mt-1' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
      </div>
      
<button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base hover:scale-105'>
  {state==='Sign up'
   ? 'Sign up' : 'Login'}</button>
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
<div className='flex items-center gap-2 text-sm text-gray-600'>
  <p>Forgot password?</p>
  <Link to='/forgot-password' className='text-primary underline'>Reset password</Link>
</div>
    </div>
   </form>
  );
};

export default Login;