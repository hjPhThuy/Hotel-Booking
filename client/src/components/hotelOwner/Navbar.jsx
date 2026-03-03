import React from 'react'
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from '../../conext/AppContext';

const Navbar = () => {

  const { logout } = useAppContext();

  return (
    <div className='flex items-center justify-between px-4 md:px-8
    border-b border-gray-300 py-3 bg-white transition-all
    duration-300'>
    <Link to='/'>
        <img src={assets.logo} alt="logo" className='h-9 invert
        opacity-80'/>
    </Link>
    <button onClick={logout} className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm">Đăng xuất</button>
    </div>
  )
}

export default Navbar