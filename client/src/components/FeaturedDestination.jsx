import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard'
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../conext/AppContext';
import { toast } from 'react-hot-toast';

const FeaturedDestination = () => {
    const navigate = useNavigate()
    const { axios } = useAppContext();
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms');
            if (data.success) {
                // Filter out rooms with missing hotel data and take first 4
                const validRooms = data.rooms.filter(room => room.hotel).slice(0, 4);
                setRooms(validRooms);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchRooms();
    }, []);

    return(
    <div className='flex flex-col items-center px-6  md:px-16 lg:px-24 bg-slate-50 py-20'>
        <Title Title='ĐIỂM ĐẾN & NƠI NGHỈ DƯỠNG NỔI BẬT' subTitle='Khám phá những lựa chọn lưu trú tinh tế và được yêu thích nhất. Chúng tôi chọn lọc những khách sạn mang đến trải nghiệm sang trọng và đáng nhớ tại các thành phố du lịch hàng đầu.'/>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 w-full'>
            {rooms.length > 0 ? (
                rooms.map((room, index) => (<HotelCard key={room._id} room={room} index={index}/>))
            ) : (
                <p className="text-gray-500 col-span-full text-center">Đang tải danh sách phòng...</p>
            )}
        </div>
        <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}} className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer '>
            Xem thêm
        </button>
    </div>
    )
}
export default FeaturedDestination