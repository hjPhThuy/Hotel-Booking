import React, { useEffect } from 'react'
import Navbar from '../../components/hotelOwner/Navbar' 
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from '../../conext/AppContext';

const Layout = () => {
  const { user, token, isOwner } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
        navigate('/login');
    }
    // Optional: Redirect if logged in but not owner (after user data loads)
    // if (user && !isOwner) { navigate('/'); toast.error("Not authorized"); }
  }, [token, user, isOwner, navigate]);

  if (!token) return null; // Or loading spinner

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
        <Navbar />
        <div className='flex flex-1 overflow-hidden'>
          <Sidebar />
          <div className='flex-1 overflow-y-auto bg-gray-50'>
            <div className='p-4 md:px-10 pt-10 pb-20'>
               <Outlet/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Layout