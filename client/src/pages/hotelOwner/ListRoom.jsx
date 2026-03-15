import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { selectToken } from '../../redux/authSlice'

const ListRoom = () => {
  const { axios } = useAppContext();
  const token = useSelector(selectToken);
  const [rooms, setRooms] = useState([])

  const fetchRooms = async () => {
      try {
          const { data } = await axios.get('${import.meta.env.VITE_API_URL}/api/rooms/owner', {
              headers: { Authorization: `Bearer ${token}` }
          });
          if (data.success) {
              setRooms(data.rooms);
          } else {
              toast.error(data.message);
          }
      } catch (error) {
          toast.error(error.message);
      }
  }

  useEffect(() => {
    if(token) fetchRooms();
  }, [token])


  const handleToggleAvailability = async (roomId) => {
      try {
          const { data } = await axios.post('${import.meta.env.VITE_API_URL}/api/rooms/toggle-availability', { roomId }, {
              headers: { Authorization: `Bearer ${token}` }
          });
          if (data.success) {
              toast.success(data.message);
              fetchRooms();
          } else {
              toast.error(data.message);
          }
      } catch (error) {
          toast.error(error.message);
      }
  }

  const handleDeleteRoom = async (id) => {
    if(!window.confirm("Bạn có chắc chắn muốn xóa phòng này?")) return;
    try {
        const { data } = await axios.post('${import.meta.env.VITE_API_URL}/api/rooms/delete', { id }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (data.success) {
            toast.success(data.message);
            fetchRooms();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  return (
    <div>
      <Title 
        align='left' 
        font='outfit' 
        title='Danh sách phòng'
        subTitle='Xem, chỉnh sửa hoặc quản lý tất cả các phòng đã đăng. Hãy cập nhật thông tin để mang đến trải nghiệm tốt nhất cho người dùng.'
      />

      <p className='text-gray-500 mt-8'>Tất cả phòng</p>

      <div className='w-full max-w-4xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>Ảnh</th>
              <th className='py-3 px-4 text-gray-800 font-medium'>Tên phòng</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Tiện nghi</th>
              <th className='py-3 px-4 text-gray-800 font-medium'>Giá / đêm</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Trạng thái</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Hành động</th>
            </tr>
          </thead>

          <tbody className='text-sm'>
            {rooms.map((item, index) => (
              <tr key={index}>
                 <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                    <img src={item.images[0]} alt="" className='w-12 h-12 object-cover rounded'/>
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  {item.roomType}
                </td>

                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                  {item.amenities.slice(0, 3).join(', ')}...
                </td>

                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  {item.pricePerNight?.toLocaleString()} VND
                </td>

                <td className='py-3 px-4 border-t border-gray-300 text-sm text-center'>
                  <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                    <input 
                      type="checkbox" 
                      className='sr-only peer' 
                      checked={item.isAvailable} 
                      onChange={() => handleToggleAvailability(item._id)}
                    />

                    <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600'></div>
                  </label>
                </td>
                 <td className='py-3 px-4 border-t border-gray-300 text-center'>
                    <button 
                         onClick={() => handleDeleteRoom(item._id)}
                         className='bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-semibold'
                     >
                         Xóa
                     </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ListRoom
