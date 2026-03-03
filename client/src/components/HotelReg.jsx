import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../conext/AppContext';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../redux/authSlice';

const HotelReg = () => {

    const {setShowHotelReg, axios, toast} = useAppContext();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

  const onSubmitHandler = async (e)=>{
    try{
        e.preventDefault();
        
        const {data} = await axios.post('/api/hotels', {name, contact, address, city})
        if (data.success){
            toast.success(data.message);
            dispatch(fetchUserProfile()); // Update User Role in Redux
            setShowHotelReg(false); 
        }else {
           toast.error(data.message);
        } 
    }
    catch(error){
       console.log(error);
       toast.error(error.message);
    }
}
  return (
    <div onClick={()=> setShowHotelReg(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center
    justify-center bg-black/70'>
    <form onSubmit={onSubmitHandler} onClick={(e)=> e.stopPropagation()} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
        <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-xl hidden md:block'/>

        <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
            <img src={assets.closeIcon} alt="close-icon" className='absolute top-4 right-4 h-4 w-4 cursor-pointer' onClick={()=> setShowHotelReg(false)}/>
            <p className='text-2xl font-semibold mt-6'>Đăng ký khách sạn của bạn</p>

            {/** Hotel Name */}
            <div className='w-full mt-4'>
                <label htmlFor='name' className="font-medium text-gray-500">Tên khách sạn</label>
                <input type="text" onChange={(e)=> setName(e.target.value)} value={name} placeholder="Nhập tên khách sạn" className="border border-gray-200
                rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light" required/>
            </div>
            {/** Phone */}
            <div className='w-full mt-4'>
                <label htmlFor='contact' className="font-medium text-gray-500">Số điện thoại</label>
                <input id='contact' type="text" onChange={(e)=> setContact(e.target.value)} value={contact} placeholder="(+84)" className="border border-gray-200
                rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light" required/>
            </div>
            {/** Address */}
            <div className='w-full mt-4'>
                <label htmlFor='address' className="font-medium text-gray-500">Địa chỉ</label>
                <input id='Address' type="text" onChange={(e)=> setAddress(e.target.value)} value={address} placeholder="Nhập địa chỉ" className="border border-gray-200
                rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light" required/>
            </div>
            {/** Select city Drop Down */}
            <div className='w-full mt-4 max-w-60 mr-auto'>
                <label htmlFor='city' className="font-medium text-gray-500">Thành phố</label>
                <select id='city' onChange={(e)=> setCity(e.target.value)} value={city} className="border border-gray-200
                rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light" required>
                    <option value="">Chọn thành phố</option>
                    {cities.map((city)=>(
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <button className='bg-indigo-500 hover:bg-indigo-600 transition-all
            text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6'>
                Đăng ký
            </button>
        </div>
    </form>

    </div>
  )
}

export default HotelReg