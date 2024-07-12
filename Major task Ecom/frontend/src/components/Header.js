import React from 'react'
import Logo from './Logo';
// import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { BiCartAlt } from "react-icons/bi";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className='h-16 shadow-sm bg-white'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-lg pl-3'>
          <input type='text' placeholder='Search Products' className='w-full outline-none' />
          <div className='text-lg min-w-12 h-8 bg-slate-600 items-center flex justify-center rounded-r-full text-white'>
            <FaSearch />
          </div>
        </div>

        <div className="flex items-center gap-3 relative">

          <Link to={"/login"} className='px-3 py-1 rounded-full bg-sky-100 hover:bg-blue-400'>Login</Link>

          <FaRegUser
            size={18}
            className="text-gray-800 hover:text-orange-700 cursor-pointer mr-2"
          />
          <BiCartAlt
            size={22}
            className="text-gray-800 hover:text-orange-700 cursor-pointer"
          />
          <div className='bg-red-600 text-white w-5 h-5 rounded-full item-center justify-center -top-2 -right-4 absolute'>
            <p className='text-sm flex justify-center'> 0</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header