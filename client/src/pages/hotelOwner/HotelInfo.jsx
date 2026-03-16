import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { assets, cities } from '../../assets/assets' // Ensure cities is exported from assets
import { useAppContext } from '../../conext/AppContext'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../redux/authSlice'
import { toast } from 'react-hot-toast'

const HotelInfo = () => {
    const { axios, backendUrl } = useAppContext();
    const token = useSelector(selectToken);
    
    // Check if cities is available, if not mock it or import it
    const cityList = cities || ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Nha Trang", "Phú Quốc"];

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const fetchHotelInfo = async () => {
        try {
             // We need an endpoint to get hotel info. Assuming we can get it via user or a specific endpoint.
             // Since we didn't create a specific GET /hotel/me endpoint, we might need to rely on the fact 
             // that we can try to "create" and if it exists it returns error, OR add a GET endpoint.
             // For now, let's assume we are creating if not exists.
             // OR: Since getOwnerRooms works by finding hotel, let's try to add a getHotel endpoint in backend properly.
             // But to be fast, I will add a simple GET /api/hotels/me route in backend first.
        } catch (error) {
            console.log(error);
        }
    }

    // Let's implement the submit handler first
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/hotels', { name, contact, address, city }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                toast.success(data.message);
                setIsRegistered(true);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
           toast.error(error.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='max-w-4xl'>
            <Title
                align='left'
                font='outfit'
                title='Thông tin khách sạn'
                subTitle='Quản lý thông tin địa điểm, liên hệ của khách sạn.'
            />

            <div className='flex bg-white rounded-xl mt-4'>
                <div className='flex flex-col w-full md:w-1/2'>
                    <div className='w-full mt-4'>
                        <label htmlFor='name' className="font-medium text-gray-500">Tên khách sạn</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Nhập tên khách sạn" className="border border-gray-200
                rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light" required />
                    </div>
                
                    <div className='w-full mt-4'>
                        <label htmlFor='contact' className="font-medium text-gray-500">Số điện thoại</label>
                        <input id='contact' type="text" onChange={(e) => setContact(e.target.value)} value={contact} placeholder="(+84)" className="border border-gray-200
                rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light" required />
                    </div>
               
                    <div className='w-full mt-4'>
                        <label htmlFor='address' className="font-medium text-gray-500">Địa chỉ</label>
                        <input id='Address' type="text" onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Nhập địa chỉ" className="border border-gray-200
                rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light" required />
                    </div>
               
                    <div className='w-full mt-4 max-w-60 mr-auto'>
                        <label htmlFor='city' className="font-medium text-gray-500">Thành phố</label>
                        <select id='city' onChange={(e) => setCity(e.target.value)} value={city} className="border border-gray-200
                rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light" required>
                            <option value="">Chọn thành phố</option>
                            {cityList.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <button className='bg-indigo-500 hover:bg-indigo-600 transition-all
            text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6'>
                        {isRegistered ? "Cập nhật" : "Đăng ký thông tin"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default HotelInfo
