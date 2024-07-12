import React from 'react';
import loginIcons from '../assets/Images 2.gif'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import imageBase from '../helpers/imageBase'; 

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const [data, setData] = useState({
    email: "", 
    password: "", 
    name: "", 
    confirmPassword: "", 
    profilePic: "", 
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  
  console.log('data login', data);
  
  // Helper function for uploading a profile picture
  const handleUploadPic = async (e) => {
    const file = e.target.files[0]; 
    
    const imagePic = await imageBase(file); 
    setData((preve) => {
      return{
        ...preve,
        profilePic : imagePic
      }
    })
  };
  
  // Handler  submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
  };
  
  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto shadow-md'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcons} alt='login icons' width={90}/> 
            </div>
            <form>
              <label>
                <div className='text-xs bg-slate-200 bg-opacity-70 py-2 text-center absolute bottom-1 w-full cursor-pointer' >Upload Pic</div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name: </label>
              <div className='bg-slate-200'>
                <input type='text' placeholder='Enter Your name'
                  name='name'
                  onChange={handleOnChange}
                  value={data.name}
                  required
                  className='h-full w-full p-1 outline-none bg-transparent' />
              </div>
            </div>

            <div className='grid'>
              <label>Email: </label>
              <div className='bg-slate-200'>
                <input type='email' placeholder='Enter Email'
                  name='email'
                  onChange={handleOnChange}
                  required
                  value={data.email}
                  className='h-full w-full p-1 outline-none bg-transparent' />
              </div>
            </div>

            <div>
              <label>Password: </label>
              <div className='bg-slate-200 p-1 flex'>
                <input type={showPassword ? "text" : "password"} placeholder='Enter Password'
                  name='password'
                  onChange={handleOnChange}
                  value={data.password}
                  required
                  className='h-full w-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                  <span>
                    {showPassword ? <FaEyeSlash /> : <FaEye />} 
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password: </label>
              <div className='bg-slate-200 p-1 flex'>
                <input type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Password'
                  name='confirmPassword'
                  onChange={handleOnChange}
                  value={data.confirmPassword}
                  className='h-full w-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} 
                  </span>
                </div>
              </div>
            </div>

            <button className='bg-blue-500 text-white px-4 py-2 w-full max-w-[120px] rounded-full hover:bg-slate-700 mx-auto block mt-6'>Sign Up</button>
          </form>

          <p className='my-4'>Already have an account?
            <Link to={"/login"} className="hover:text-blue-700 underline">Log In</Link> 
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp; 
