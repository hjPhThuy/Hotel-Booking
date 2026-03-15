import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'
import { assets } from '../../assets/assets'

const CustomerCare = () => {
    const { axios, token } = useAppContext()
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        if(token) fetchReviews()
    }, [token])

    const fetchReviews = async () => {
        try {
            const { data } = await axios.get('${import.meta.env.VITE_API_URL}/api/reviews/all', { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setReviews(data.reviews)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className=''>
      <h2 className='text-2xl font-medium mb-4'>Chăm sóc khách hàng - Đánh giá</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
            <thead>
                <tr className='bg-gray-100 border-b border-gray-200'>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Khách hàng</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Khách sạn</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Phòng</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Đánh giá</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Nội dung</th>
                    <th className='py-3 px-4 text-left text-sm font-semibold text-gray-600'>Ngày gửi</th>
                </tr>
            </thead>
            <tbody>
                {reviews.map((item, index) => (
                    <tr key={index} className='border-b border-gray-200 hover:bg-gray-50'>
                        <td className='py-3 px-4'>
                            <p className='font-medium'>{item.user?.username || "Guest"}</p>
                            <span className='text-xs text-gray-500'>{item.user?.email}</span>
                        </td>
                        <td className='py-3 px-4 text-sm font-medium text-gray-700'>
                            {item.hotel?.name}
                        </td>
                        <td className='py-3 px-4 text-sm font-medium text-gray-700'>
                            {item.room?.roomType}
                        </td>
                        <td className='py-3 px-4'>
                            <div className='flex items-center gap-1'>
                                {[...Array(5)].map((_, i) => (
                                    <img 
                                        key={i} 
                                        src={i < item.rating ? assets.starIconFilled : assets.starIconOutlined} 
                                        alt="star" 
                                        className='w-4 h-4'
                                    />
                                ))}
                            </div>
                        </td>
                        <td className='py-3 px-4 text-sm text-gray-600 max-w-xs truncate' title={item.comment}>
                            {item.comment}
                        </td>
                         <td className='py-3 px-4 text-sm text-gray-500'>
                            {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
                {reviews.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center py-6 text-gray-500">Chưa có đánh giá nào từ khách hàng.</td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomerCare
