import React from 'react';
import loginIcons from '../assets/Images 2.gif'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useState } from 'react'; 
import { Link } from 'react-router-dom'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // useState hook to toggle password visibble
  const [data, setData] = useState({
    email: "", 
    password: "" 
  });

  // it will store email and pass
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler submission
  const handleSubmit = (e) => {
    e.preventDefault(); // when you submit the data it page will not refresh that why it default
  };

  console.log('data login');

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto shadow-md'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons' width={80} /> 
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email: </label>
              <div className='bg-slate-200'>
                <input type='email' placeholder='Enter Email'
                  name='email' // same as key name
                  onChange={handleOnChange}
                  value={data.email}
                  className='h-full w-full p-1 outline-none bg-transparent' />
              </div>
            </div>

            <div>
              <label>Password: </label>
              <div className='bg-slate-200 p-1 flex'>
                <input type={showPassword ? "text" : "password"} placeholder='Enter Password'
                  name='password' // same as key name
                  onChange={handleOnChange}
                  value={data.password}
                  className='h-full w-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                  <span>
                    {showPassword ? <FaEyeSlash /> : <FaEye />} 
                  </span>
                </div>
              </div>
              <Link to={'/forgot-password'} className="block w-fit ml-auto text-blue-600 hover:text-red-600">Forgot Password?</Link>
            </div>

            <button className='bg-blue-500 text-white px-6 py-2 w-full max-w-[140px] rounded-full hover:bg-slate-700 mx-auto block mt-5'>Login</button>
          </form>
          <p className='my-5'>Don't have an account?
            <Link to={"/sign-up"} className="hover:text-blue-800 underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login; 
