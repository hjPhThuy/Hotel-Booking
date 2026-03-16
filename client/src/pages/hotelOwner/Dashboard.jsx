import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'

const Dashboard = () => {

    const { axios, token } = useAppContext()
    const [dashboardData, setDashboardData]= useState({
        totalBookings: 0,
        totalRevenue: 0,
        bookings: []
    })

    useEffect(() => {
        if(token) fetchDashboardData()
    }, [token])

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/bookings/hotel', { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setDashboardData({
                    totalBookings: data.totalBookings,
                    totalRevenue: data.totalRevenue,
                    bookings: data.bookings
                })
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div>
        <Title align='left' font='outfit' title='Bảng điều khiển' subTitle={`Theo dõi danh sách phòng, theo dõi đặt phòng và phân tích doanh thu - tất cả tại một nơi. Luôn cập nhật thông tin chi tiết theo thời gian thực để đảm bảo hoạt động trơn tru.`}/>

        <div className='flex gap-4 my-8'>
            {/*----Total Bookings-- */}
            <div className='bg-blue-50 border border-blue-100 rounded flex p-4
            pr-8 items-center cursor-pointer hover:shadow-sm transition'>
                <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10'/>
                <div className='flex flex-col sm:ml-4 font-medium'>
                    <p className='text-blue-500 text-lg'>Tổng số đặt phòng</p>
                    <p className='text-gray-600 text-xl font-semibold'>{dashboardData.totalBookings}</p>
                </div>
            </div>
            {/**----Total revenue-- */}
            <div className='bg-blue-50 border border-blue-100 rounded flex p-4
            pr-8 items-center cursor-pointer hover:shadow-sm transition'>
                <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10'/>
                <div className='flex flex-col sm:ml-4 font-medium'>
                    <p className='text-blue-500 text-lg'>Tổng doanh thu</p>
                    <p className='text-gray-600 text-xl font-semibold'>{dashboardData.totalRevenue?.toLocaleString()} VND</p>
                </div>
            </div>
        </div>
        {/** ------ Recent Bookings -------- */}
        <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Đặt phòng gần đây</h2>
            <div className='w-full text-left border border-gray-300
            rounded-lg overflow-x-auto'>
                <table className='w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Tên khách hàng</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Tên phòng</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Tổng số tiền</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Hình thức TT</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Tình trạng thanh toán</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Trạng thái</th>
                        </tr>
                    </thead>
            <tbody className='text-sm'>
                {dashboardData.bookings.map((item, index)=>(
                    <tr key={index}>
                        <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                            {item.user?.username || "Guest"}
                        </td>

                        <td className='py-3 px-4 text-gray-700 border-t border-gray-300
                        max-sm:hidden'>
                            {item.room?.roomType}
                        </td>

                        <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                            {item.totalPrice?.toLocaleString()} VND
                        </td>

                        <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                             {item.paymentMethod === 'online' ? 'Chuyển khoản' : 'Tiền mặt'}
                        </td>

                         <td className='py-3 px-4 border-t border-gray-300 flex'>
                           <button className={`py-1 px-3 text-xs rounded-full mx-auto 
                            ${item.isPaid ? 'bg-green-200 text-green-600' : 'bg-gray-200 text-gray-600'}`}>
                            {item.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                           </button>
                        </td>
                         <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                         <span className={`px-2 py-1 rounded-full text-xs ${
                                item.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {item.status === 'pending' ? 'Chờ xác nhận' : item.status === 'confirmed' ? 'Đã xác nhận' : 'Đã hủy'}
                            </span>
                         </td>

                    </tr>
                ))}
            </tbody>
                </table>
            </div>

    </div>
  )
}

export default Dashboard