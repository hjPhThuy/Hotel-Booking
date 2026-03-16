import React, { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../conext/AppContext'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'

const MyBookings = () => {

  const { axios, getToken } = useAppContext()

  const [bookings, setBookings] = useState([])
  
  // Review State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const fetchUserBookings = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get('/api/bookings/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      } 
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const handleCancelBooking = async (id) => {
    try {
      if(!window.confirm("Bạn có chắc chắn muốn hủy đơn đặt phòng này không?")) return;
      
      const token = await getToken()
      const { data } = await axios.post('/api/bookings/cancel', { id }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        toast.success(data.message)
        fetchUserBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const handleOpenReview = (bookingId) => {
      setSelectedBookingId(bookingId);
      setReviewRating(5);
      setReviewComment("");
      setShowReviewModal(true);
  }

  const handleSubmitReview = async () => {
    try {
        if (!reviewComment.trim()) {
            toast.error("Vui lòng nhập nội dung đánh giá");
            return;
        }
        
        const token = await getToken();
        const { data } = await axios.post('/api/reviews/add', 
            { bookingId: selectedBookingId, rating: reviewRating, comment: reviewComment },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
            toast.success(data.message);
            setShowReviewModal(false);
            fetchUserBookings(); // Refresh list to update isReviewed status
        } else {
            toast.error(data.message);
        }
    } catch (error) {
         toast.error(error.response?.data?.message || "Lỗi khi gửi đánh giá");
    }
  }

  useEffect(() => {
    fetchUserBookings()
  }, [])

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>

      <Title
        title='Đặt phòng'
        subTitle='Dễ dàng quản lý các đặt phòng khách sạn đã qua, hiện tại và sắp tới của bạn chỉ tại một nơi.'
        align='left'
      />

      <div className='max-w-6xl mt-8 w-full text-gray-800'>
        {/* Header */}
        <div className='hidden md:grid md:grid-cols-[1.8fr_0.7fr_1fr_0.8fr_1fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
          <div>Khách sạn</div>
          <div>Mã đơn</div>
          <div>Ngày & Giờ</div>
          <div>Tổng cộng</div>
          <div>Trạng thái</div>
          <div>Thanh toán</div>
        </div>

        {/* List */}
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className='grid grid-cols-1 md:grid-cols-[1.8fr_0.7fr_1fr_0.8fr_1fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'
          >

            {/* ------------------ Hotel Details ------------------ */}
            <div className='flex flex-col md:flex-row'>
              <img
                src={booking.room.images[0]}
                alt="hotel-img"
                className='min-w-32 h-24 rounded shadow object-cover'
              />

              <div className='flex flex-col gap-1.5 max-md:mt-3 md:ml-4'>
                <p className='font-playfair text-xl'>
                  {booking.hotel.name}
                </p>
                <div className='font-inter text-sm text-gray-600'>
                     {booking.room.roomType}
                </div>

                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{booking.hotel.address}</span>
                </div>
              </div>
            </div>

            {/* ------------------ Booking Code ------------------ */}
             <div className='flex flex-col items-start justify-center text-sm gap-1 mt-3 md:mt-0'>
                <p className='md:hidden text-xs text-gray-500'>Mã đơn:</p>
                <span className='font-mono font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200'>
                    {booking.code || "N/A"}
                </span>
             </div>

            {/* ------------------ Date & Timings ------------------ */}
            <div className='flex flex-row md:flex-col md:items-start md:justify-center md:gap-2 mt-3 md:mt-0 gap-8'>
              <div>
                <p className='text-xs text-gray-500'>Nhận phòng:</p>
                <p className='text-sm font-medium'>
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className='text-xs text-gray-500'>Trả phòng:</p>
                <p className='text-sm font-medium'>
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* ------------------ Price ------------------ */}
             <div className='flex flex-col items-start justify-center text-sm gap-1 mt-3 md:mt-0'>
                <p className='md:hidden text-xs text-gray-500'>Giá tiền:</p>
                <p className='font-semibold'>{booking.totalPrice?.toLocaleString()} VND</p>
             </div>

             {/* ------------------ Status ------------------ */}
             <div className='flex items-center md:justify-start mt-3 md:mt-0'>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {booking.status === 'confirmed' ? 'Đã xác nhận' : booking.status === 'pending' ? 'Chờ xác nhận' : 'Đã hủy'}
                </span>
             </div>

            {/* ------------------ Payment Status ------------------ */}
            <div className='flex flex-col items-start justify-center pt-3 md:pt-0'>
              <div className='flex items-center gap-2'>
                <div
                  className={`h-2 w-2 rounded-full ${
                    booking.isPaid ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>

                <p
                  className={`text-sm font-medium ${
                    booking.isPaid ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {booking.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </p>
              </div>

              <p className='text-sm text-gray-500 mt-2'>
                  <span className='font-medium text-gray-700'>
                      {booking.paymentMethod === 'online' ? 'Chuyển khoản' : 'Tiền mặt'}
                  </span>
              </p>

              {booking.status === 'pending' && (
                 <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className='px-4 py-1.5 mt-2 text-xs font-medium border border-rose-300 text-rose-600 rounded-full hover:bg-rose-50 transition-all cursor-pointer'
                  >
                    Hủy đặt phòng
                  </button>
              )}

              {/* Review Button Logic - Show if Confirmed, Checked Out, and Not Reviewed */}
              {booking.status === 'confirmed' && !booking.isReviewed && new Date(booking.checkOutDate) < new Date() && (
                  <button
                    onClick={() => handleOpenReview(booking._id)}
                    className='px-4 py-1.5 mt-2 text-xs font-medium bg-yellow-400 text-yellow-900 rounded-full hover:bg-yellow-500 hover:shadow-md transition-all cursor-pointer'
                  >
                    Đánh giá
                  </button>
              )}
               {booking.isReviewed && (
                  <span className='px-3 py-1 mt-2 text-xs bg-gray-100 text-gray-500 rounded-full'>Đã đánh giá</span>
              )}
            </div>

          </div>
        ))}

      </div>

      
      {/* Review Modal */}
      {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slideUp">
                  <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Đánh giá trải nghiệm</h3>
                      
                      {/* Star Rating Input */}
                      <div className="flex justify-center gap-2 mb-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                              <button 
                                key={star} 
                                type="button" 
                                onClick={() => setReviewRating(star)}
                                className="focus:outline-none transition-transform hover:scale-110 active:scale-90"
                              >
                                  <img 
                                    src={star <= reviewRating ? assets.starIconFilled : assets.starIconOutlined} 
                                    alt={`${star} stars`} 
                                    className="w-8 h-8"
                                  />
                              </button>
                          ))}
                      </div>

                      <textarea
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm mb-4 min-h-[100px]"
                          placeholder="Bạn cảm thấy thế nào về khách sạn này? Hãy chia sẻ với chúng tôi..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                      ></textarea>

                      <div className="flex gap-3">
                          <button 
                              onClick={() => setShowReviewModal(false)}
                              className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                          >
                              Đóng
                          </button>
                          <button 
                              onClick={handleSubmitReview}
                              className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md transition-colors"
                          >
                              Gửi đánh giá
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  )
}

export default MyBookings
