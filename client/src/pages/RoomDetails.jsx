import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData  } from '../assets/assets'
import StarRating from '../components/StarRating'
import { useAppContext } from '../conext/AppContext'
import { toast } from 'react-hot-toast'

const RoomDetails = () => {
  const { id } = useParams()
  const { axios, getToken, user } = useAppContext()
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [mainImage, setMainImage] = useState(null)
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)

  
  const [totalPrice, setTotalPrice] = useState(0);
  const [stayDuration, setStayDuration] = useState(0);
  
  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'online'
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingSuccessCode, setBookingSuccessCode] = useState(null);

  // Calculate Total Price whenever dates change
  useEffect(() => {
      if (checkInDate && checkOutDate && room) {
          const start = new Date(checkInDate);
          const end = new Date(checkOutDate);
          const diffTime = Math.abs(end - start);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          
          if (end > start) {
              setStayDuration(diffDays);
              if (diffDays > 1) {
                setTotalPrice(room.pricePerNight + (diffDays - 1) * (room.pricePerNight * 0.5));
              } else {
                setTotalPrice(diffDays * room.pricePerNight);
              }
          } else {
              setStayDuration(0);
              setTotalPrice(0);
          }
      }
  }, [checkInDate, checkOutDate, room]);

  const fetchRoomData = async () => {
    try {
      const { data } = await axios.get('/api/rooms')
      const foundRoom = data.rooms.find(room => room._id === id)
      if (foundRoom) {
        setRoom(foundRoom)
        setMainImage(foundRoom.images[0])
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchReviews = async () => {
    try {
        const { data } = await axios.get(`/api/reviews/room/${id}`)
        if (data.success) {
            setReviews(data.reviews)
            // Calculate Average Rating
            if (data.reviews.length > 0) {
                const total = data.reviews.reduce((acc, curr) => acc + curr.rating, 0);
                setAverageRating((total / data.reviews.length).toFixed(1));
            }
        }
    } catch (error) {
        console.error("Failed to fetch reviews", error)
    }
  }

  useEffect(() => {
    fetchRoomData()
    fetchReviews()
  }, [id])

  useEffect(() => {
    if (user) {
        setName(user.username || '');
        setEmail(user.email || '');
        setPhone(user.phone || '');
    }
  }, [user]);

  const handleBookRoom = async (e) => {
    e.preventDefault()
    
    // Check validation if user is NOT logged in
    if (!user) {
       if (!name || !email || !phone) {
           toast.error("Vui lòng điền đầy đủ thông tin");
           return;
       }
    }
    // Show confirmation modal instead of booking directly
    setShowConfirmModal(true);
  }

  const submitBooking = async () => {
    try {
        const token = await getToken();
        // const headers = token ? { Authorization: `Bearer ${token}` } : {}; 
        const requestHeaders = token ? { Authorization: `Bearer ${token}` } : {};

        const { data } = await axios.post('/api/bookings/book', 
            { checkInDate, checkOutDate, room: room._id, guests, name, email, phone, paymentMethod: paymentMethod === 'online' ? 'online' : 'cash' },
            { headers: requestHeaders }
        )
        if (data.success) {
            setShowConfirmModal(false); // Close modal
            // toast.success(data.message)
            setBookingSuccessCode(data.code); 

            if (user) {
                 // Delay navigation or show modal first? 
                 // If logged in, maybe still show code? Or just navigate?
                 // The requirement says "send code to guest". 
                 // Let's show the modal for everyone, then they can close it to navigate or stay.
                 // But existing logic navigates immediately.
                 // Let's NOT navigate immediately if we want to show code.
                 // Or navigate but pass state?
                 // User might be guest (not logged in).
                 
            } else {
                setCheckInDate('')
                setCheckOutDate('')
                setGuests(1)
                setName('')
                setEmail('')
                setPhone('')
            }
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message)
    }
  }

  return room && (
    <div className='container mx-auto px-4 md:px-8 lg:px-16 py-8 pt-20'>
      
      {/* --- Breadcrumb / Title Section --- */}
      <div className='flex flex-col gap-2 mb-6'>
         <h1 className='text-3xl md:text-4xl font-playfair font-bold text-gray-900'>
           {room.hotel.name} - {room.roomType}
         </h1>
         <div className='flex items-center gap-4 text-sm text-gray-600'>
            <div className='flex items-center gap-1'>
                 <div className="flex text-amber-500 text-lg">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.round(averageRating) ? "text-amber-500" : "text-gray-300"}>★</span>
                    ))}
                 </div>
                 <span className='font-medium underline cursor-pointer ml-1'>{reviews.length} đánh giá</span>
            </div>
            <span>•</span>
            <div className='flex items-center gap-1'>
                 <img src={assets.locationIcon} alt='location' className='w-4 h-4 opacity-70'/>
                 <span>{room.hotel.address}</span>
            </div>
         </div>
      </div>

      {/*Room images */}
      <div className='flex flex-col lg:flex-row mt-6 gap-6 mb-10'>
        <div className='lg:w-1/2 w-full'>
          <img
            src={mainImage}
            alt='Room Image'
            className='w-full rounded-xl shadow-lg object-cover'
          />
        </div>

        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
          {room?.images.length > 1 && room.images.map((image, index) => (
            <img
              onClick={() => setMainImage(image)}
              key={index}
              src={image}
              alt='Room Image'
              className={`w-full rounded-xl shadow-md object-cover h-[200px]
               cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`}
            />
          ))}
        </div>
      </div>


      {/* --- Content Area Grid (Left: Info, Right: Booking Form) --- */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
         
         {/* LEFT COLUMN: Details */}
         <div className='lg:col-span-2'>
            
            {/* Host & Room Highlights */}
            <div className='flex justify-between items-start border-b border-gray-200 pb-8'>
                <div>
                     <h2 className='text-2xl font-playfair font-semibold mb-1'> {room.hotel.name}</h2>
                     <p className='text-gray-500'>
                        {room.roomType} 
                     </p>
                </div>
            </div>

            {/* Room Features */}
            <div className='py-8 border-b border-gray-200'>
                 <div className='space-y-6'>
                    {roomCommonData.map((item, idx) => (
                        <div key={idx} className='flex gap-4'>
                            <img src={item.icon} alt="feat" className='w-6 h-6 opacity-80'/>
                            <div>
                                <h3 className='font-medium text-gray-900'>{item.title}</h3>
                                <p className='text-sm text-gray-500'>{item.description}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

             {/* Amenities */}
            <div className='py-8 border-b border-gray-200'>
                <h2 className='text-2xl font-playfair font-semibold mb-6'>Tiện nghi nơi ở</h2>
                <div className='grid grid-cols-2 gap-4'>
                     {room.amenities.map((amenity, idx)=> (
                         <div key={idx} className='flex items-center gap-3 text-gray-700'>
                             <img src={facilityIcons[amenity] || assets.starIconOutlined} alt="icon" className='w-5 h-5 opacity-70'/>
                             <span>{amenity}</span>
                         </div>
                     ))}
                </div>
            </div>

            {/* Description */}
            <div className='py-8'>
                <h2 className='text-2xl font-playfair font-semibold mb-4'>Về chỗ ở này</h2>
                <p className='text-gray-600 leading-relaxed max-w-2xl whitespace-pre-line'>
                    {room.description || "Chưa có mô tả chi tiết cho phòng này."}
                </p>
            </div>

            {/* Reviews Section */}
            <div className='py-8 border-t border-gray-200'>
                <h2 className='text-2xl font-playfair font-semibold mb-6'>Đánh giá từ khách hàng ({reviews.length})</h2>
                
                {reviews.length === 0 ? (
                    <p className="text-gray-500 italic">Chưa có đánh giá nào cho phòng này.</p>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold uppercase shadow-sm">
                                            {review.user?.username?.[0] || "U"}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{review.user?.username || "Người dùng ẩn danh"}</p>
                                            <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex text-amber-500 text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < review.rating ? "text-amber-500" : "text-gray-300"}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
         </div>


         {/* RIGHT COLUMN: Sticky Booking Widget */}
         <div className='lg:col-span-1 relative'>
            <div className='sticky top-24 bg-white rounded-xl shadow-[0_6px_25px_rgba(0,0,0,0.12)] border border-gray-200 p-6'>
                
                {/* Price Header */}
                <div className='flex justify-between items-end mb-6'>
                     <div>
                        <span className='text-2xl font-bold font-playfair'>
                            {room.pricePerNight?.toLocaleString()} VND
                        </span>
                        <span className='text-gray-500 text-sm'> / đêm</span>
                     </div>
                     <div className='flex items-center text-sm font-medium'>
                        <div className="flex text-amber-500 text-sm">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.round(averageRating) ? "text-amber-500" : "text-gray-300"}>★</span>
                            ))}
                        </div>
                        <span className='ml-1 text-gray-600'>{reviews.length} đánh giá</span>
                     </div>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleBookRoom} className='flex flex-col gap-4'>
                    
                    <div className='border border-gray-300 rounded-lg overflow-hidden'>
                         <div className='grid grid-cols-2 border-b border-gray-300'>
                            <div className='p-3 border-r border-gray-300'>
                                <label className='block text-[10px] font-bold uppercase tracking-wider text-gray-700'>Nhận phòng</label>
                                <input 
                                    type="date" 
                                    required
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    className='w-full outline-none text-sm text-gray-600 mt-1'
                                />
                            </div>
                            <div className='p-3'>
                                <label className='block text-[10px] font-bold uppercase tracking-wider text-gray-700'>Trả phòng</label>
                                <input 
                                    type="date" 
                                    required
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                    className='w-full outline-none text-sm text-gray-600 mt-1'
                                />
                            </div>
                         </div>
                         <div className='p-3'>
                             <label className='block text-[10px] font-bold uppercase tracking-wider text-gray-700'>Khách</label>
                             <input 
                                type="number" 
                                min="1"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                placeholder=""
                                className='w-full outline-none text-sm text-gray-600 mt-1'
                             />
                         </div>
                    </div>

                    {/* Guest Details (If not logged in) - Expandable or Modal could be better but keeping simple */}
                    {!user && (
                        <div className='space-y-3 bg-gray-50 p-4 rounded-lg mt-2'>
                            <p className='text-xs font-semibold text-gray-500 uppercase'>Thông tin liên hệ</p>
                            <input type='text' placeholder='Họ tên' value={name} onChange={e=>setName(e.target.value)} required className='w-full p-2 text-sm border rounded bg-white'/>
                            <input type='email' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} required className='w-full p-2 text-sm border rounded bg-white'/>
                            <input type='tel' placeholder='Số điện thoại' value={phone} onChange={e=>setPhone(e.target.value)} required className='w-full p-2 text-sm border rounded bg-white'/>
                        </div>
                    )}

                    {/* Price Breakdown Summary */}
                    {stayDuration > 0 && (
                        <div className='bg-gray-50 p-4 rounded-lg space-y-2 border border-blue-100'>
                            <div className='text-sm text-gray-600 mb-1 font-medium pb-2 border-b border-gray-200'>
                                {stayDuration + 1} ngày {stayDuration} đêm
                            </div>
                            <div className='flex justify-between text-gray-600 text-sm flex-wrap gap-2'>
                                {stayDuration > 1 ? (
                                    <span className='text-xs'>
                                        (1 đêm x {room.pricePerNight?.toLocaleString()}) + ({stayDuration - 1} đêm x {(room.pricePerNight * 0.5)?.toLocaleString()})
                                    </span>
                                ) : (
                                    <span>{room.pricePerNight?.toLocaleString()} VND x {stayDuration} đêm</span>
                                )}
                                <span className='font-semibold'>{totalPrice?.toLocaleString()} VND</span>
                            </div>
                            <div className='border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-800 text-lg'>
                                <span>Tổng cộng</span>
                                <span className='text-rose-600'>{totalPrice?.toLocaleString()} VND</span>
                            </div>
                           
                        </div>
                    )}
                    
                    {/* Payment Method Selection */}
                    <div className='bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-200'>
                         <p className='text-xs font-semibold text-gray-500 uppercase'>Phương thức thanh toán</p>
                         
                         <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-rose-500 bg-rose-50' : 'border-gray-200 hover:border-gray-300'}`}>
                             <input 
                                type="radio" 
                                name="payment" 
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={() => setPaymentMethod('cash')}
                                className="w-4 h-4 text-rose-600 focus:ring-rose-500 border-gray-300"
                             />
                             <span className="ml-2 text-sm font-medium text-gray-700">Trả tiền mặt tại khách sạn</span>
                         </label>

                         <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-rose-500 bg-rose-50' : 'border-gray-200 hover:border-gray-300'}`}>
                             <input 
                                type="radio" 
                                name="payment" 
                                value="online"
                                checked={paymentMethod === 'online'}
                                onChange={() => setPaymentMethod('online')}
                                className="w-4 h-4 text-rose-600 focus:ring-rose-500 border-gray-300"
                             />
                             <span className="ml-2 text-sm font-medium text-gray-700">Thanh toán chuyển khoản</span>
                         </label>

                         {/* QR Code Display */}
                         {paymentMethod === 'online' && (
                             <div className="mt-4 p-4 bg-white rounded border border-gray-200 flex flex-col items-center animate-fadeIn">
                                 <p className="text-xs text-gray-500 mb-2">Quét mã QR để thanh toán</p>
                                 {/* Placeholder QR Code */}
                                 <img 
                                    src={assets.qr} 
                                    alt="QR Code Payment" 
                                    className="w-60 h-60 object-contain"
                                 />
                                 <p className="text-xs text-gray-400 mt-2 text-center">Nội dung: {name || "Ten_Khach"} - {phone || "SDT"}</p>
                             </div>
                         )}
                    </div>

                    <button 
                        type="submit" 
                        className='w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 
                        text-white font-semibold py-3.5 rounded-lg text-lg shadow-md transition-all active:scale-[0.98] mt-2'
                    >
                        Đặt phòng
                    </button>

                </form>

            </div>
         </div>

      </div>
      
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-slideUp">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-100 to-orange-50 p-4 border-b border-orange-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-orange-800 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Xác nhận đơn đặt phòng của bạn
                    </h3>
                    <button onClick={() => setShowConfirmModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    
                    {/* Warning Section */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-sm text-gray-800 font-medium mb-2">⚠️ LƯU Ý QUAN TRỌNG:</p>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                            <li><strong>Kiểm tra thông tin:</strong> Vui lòng rà soát kỹ các thông tin đặt phòng (Ngày nhận/trả phòng, Loại phòng, Thông tin cá nhân).</li>
                            <li>Sau khi chúng tôi xác nhận đơn đặt phòng, quý khách sẽ <span className="text-rose-600 font-bold">không thể tự chỉnh sửa hoặc hủy phòng</span> trên hệ thống.</li>
                        </ul>
                    </div>

                    {/* Payment Info Section */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-900 font-medium mb-2">Hình thức thanh toán: <span className="font-bold text-blue-700">{paymentMethod === 'online' ? 'Chuyển khoản' : 'Tiền mặt'}</span></p>
                        <div className="text-sm text-gray-600 space-y-2">
                             {paymentMethod === 'cash' ? (
                                <div className="flex gap-2 items-start">
                                    <span className="text-blue-500 mt-0.5">➤</span>
                                    <p>Quý khách vui lòng <span className="font-semibold">hoàn tất thanh toán trực tiếp tại quầy tiền phòng</span> vào thời điểm Trả phòng (Check-out).</p>
                                </div>
                             ) : (
                                <div className="flex gap-2 items-start">
                                    <span className="text-blue-500 mt-0.5">➤</span>
                                    <p>Vui lòng <span className="font-semibold">hoàn tất giao dịch ngay</span> để đơn hàng được ưu tiên xử lý.</p>
                                </div>
                             )}
                        </div>
                    </div>

                    <p className="text-xs text-center text-gray-500 pt-2 italic">
                        Bằng cách nhấn "Xác nhận & Gửi yêu cầu", bạn đồng ý với các điều khoản nêu trên.
                    </p>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3 flex-col sm:flex-row">
                    <button 
                        onClick={() => setShowConfirmModal(false)}
                        className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all text-sm shadow-sm"
                    >
                        Quay lại chỉnh sửa
                    </button>
                    <button 
                        onClick={submitBooking}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg font-bold hover:shadow-lg hover:from-rose-600 hover:to-rose-700 transition-all text-sm shadow-md"
                    >
                        Xác nhận & Gửi yêu cầu
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Booking Success Modal */}
      {bookingSuccessCode && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scaleIn relative">
                <div className="bg-emerald-500 h-2 w-full"></div>
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Đặt phòng thành công!</h3>
                    <p className="text-gray-500 mb-6">Cảm ơn bạn đã tin tưởng. Dưới đây là mã đơn hàng của bạn:</p>
                    
                    <div className="bg-gray-100 p-4 rounded-xl border border-dashed border-gray-300 mb-6 relative group">
                        <span className="text-3xl font-mono font-bold text-gray-800 tracking-wider select-all">{bookingSuccessCode}</span>
                        <p className="text-xs text-gray-400 mt-2">Hãy lưu mã này để tra cứu trạng thái đơn hàng</p>
                    </div>

                    <button 
                        onClick={() => {
                            setBookingSuccessCode(null);
                            if(user) navigate('/my-bookings');
                        }}  
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-200"
                    >
                        Hoàn tất
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  )
}

export default RoomDetails
