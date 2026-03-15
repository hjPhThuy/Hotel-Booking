
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'

const Consultations = () => {
    const { axios, token } = useAppContext()
    const [consultations, setConsultations] = useState([])

    useEffect(() => {
        if(token) fetchConsultations()
    }, [token])

    const fetchConsultations = async () => {
        try {
            const { data } = await axios.get('${import.meta.env.VITE_API_URL}/api/bookings/hotel', { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setConsultations(data.bookings)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleDelete = async (id) => {
        if(!window.confirm("Bạn có chắc chắn muốn xóa yêu cầu này?")) return;
        try {
            const { data } = await axios.post('${import.meta.env.VITE_API_URL}/api/bookings/delete', { id }, { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                toast.success(data.message)
                fetchConsultations(); // Refresh list
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleConfirm = async (id) => {
        try {
            const { data } = await axios.post('${import.meta.env.VITE_API_URL}/api/bookings/confirm', { id }, { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                toast.success(data.message)
                fetchConsultations()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleMarkPaid = async (id) => {
        try {
            const { data } = await axios.post('${import.meta.env.VITE_API_URL}/api/bookings/mark-paid', { id }, { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                toast.success(data.message)
                fetchConsultations()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className=''>
      <h2 className='text-2xl font-medium mb-4'>Danh sách yêu cầu đặt phòng</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
            <thead>
                <tr className='bg-gray-100 border-b border-gray-200'>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Khách hàng</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Liên hệ</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Phòng đặt</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Hình thức TT</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Thanh toán</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Ngày dự kiến</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Trạng thái</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {consultations.map((item, index) => (
                    <tr key={index} className='border-b border-gray-200 hover:bg-gray-50'>
                        <td className='py-3 px-4'>
                            <p className='font-medium'>{item.user?.username || "Guest"}</p>
                            <span className='text-xs text-gray-500'>Khách: {item.guests}</span>
                        </td>
                        <td className='py-3 px-4'>
                             <p className='text-sm'>{item.user?.email}</p>
                             {/* Note: Phone is currently not in User model but passed in request, strictly speaking we should sync it or store in Booking */}
                        </td>
                        <td className='py-3 px-4'>
                            <p className='text-sm font-medium'>{item.room?.roomType}</p>
                            <p className='text-xs text-gray-500'>{item.hotel?.name}</p>
                        </td>
                        <td className='py-3 px-4'>
                            <span className={`text-sm font-medium ${
                                item.paymentMethod === 'online' ? 'text-blue-600' : 'text-gray-700'
                            }`}>
                                {item.paymentMethod === 'online' ? 'Chuyển khoản' : 'Tiền mặt'}
                            </span>
                        </td>
                        <td className='py-3 px-4'>
                            <div className='flex flex-col items-start gap-1'>
                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${
                                    item.isPaid ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'
                                }`}>
                                    {item.isPaid ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}
                                </span>
                                {!item.isPaid && (
                                    <button 
                                        onClick={() => handleMarkPaid(item._id)}
                                        className='text-[10px] text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer'
                                    >
                                        Xác nhận đã thanh toán
                                    </button>
                                )}
                            </div>
                        </td>
                        <td className='py-3 px-4 text-sm'>
                            {new Date(item.checkInDate).toLocaleDateString()} - {new Date(item.checkOutDate).toLocaleDateString()}
                        </td>
                        <td className='py-3 px-4'>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                                item.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {item.status === 'pending' ? 'Chờ xác nhận' : item.status === 'confirmed' ? 'Đã xác nhận' : 'Đã hủy'}
                            </span>
                        </td>
                         <td className='py-3 px-4 flex items-center gap-2'>
                             {item.status === 'pending' && (
                                <button 
                                 onClick={() => handleConfirm(item._id)}
                                 className='text-green-600 hover:text-green-800 text-sm font-medium'
                                >
                                 Xác nhận
                                </button>
                             )}
                             <button 
                                 onClick={() => handleDelete(item._id)}
                                 className='text-red-500 hover:text-red-700 text-sm font-medium'
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

export default Consultations
