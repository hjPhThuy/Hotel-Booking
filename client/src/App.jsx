import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
import Consultations from "./pages/hotelOwner/Consultations";
import CustomerCare from "./pages/hotelOwner/CustomerCare";
import {Toaster} from "react-hot-toast";
import { useAppContext } from './conext/AppContext';
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './components/About';
import Activities from './components/Activities';
import ChatWidget from './components/ChatWidget';


const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner");
  const {showHotelReg, setShowHotelReg} = useAppContext();
  return (
    <div>
      <Toaster/>
      {!isOwnerPath && <ChatWidget />}
      {!isOwnerPath && <Navbar />}
      {showHotelReg &&<HotelReg />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/rooms' element={<AllRooms/>}/>
          <Route path='/rooms/:id' element={<RoomDetails/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/activities' element={<Activities/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
          <Route path='/owner' element={<Layout/>}> 
            <Route index element={<Dashboard/>}/>
            <Route path="add-room" element={<AddRoom/>}/>
            <Route path="list-room" element={<ListRoom/>}/>
            <Route path="consultations" element={<Consultations/>}/>
            <Route path="customer-care" element={<CustomerCare/>}/>
          </Route>
        </Routes>

      </div>
      <Footer/>

    </div>
  )
}
export default App