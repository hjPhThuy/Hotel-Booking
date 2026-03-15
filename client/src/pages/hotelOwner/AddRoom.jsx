import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../conext/AppContext'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { selectToken } from '../../redux/authSlice'

const AddRoom = () => {

  const { axios, backendUrl, navigate } = useAppContext();
  const token = useSelector(selectToken);
  
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,  
  })

  // Room Inputs
  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    description: '',
    amenities: {
      "Miễn phí WiFi": false,
      "Miễn phí bữa sáng": false,
      "Dịch vụ phòng": false,
      "Khung cảnh đẹp": false,
      "Hồ bơi": false,
      "Hủy phòng miễn phí": false,
      "Xe đưa đón miễn phí": false,
      "Lễ tân 24h": false,
      "Quầy bar": false,
      "Spa & Chăm sóc sức khỏe": false,
      "Ban công":false,
      
    }
  })

  // Hotel Inputs (Only used if user has no hotel)
  const [hotelInputs, setHotelInputs] = useState({
      name: '',
      contact: '',
      address: '',
      city: ''
  });
  const [userHotels, setUserHotels] = useState([]);
  const [isNewHotel, setIsNewHotel] = useState(false);
  const [loadingHotel, setLoadingHotel] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // Fetch user hotels
  React.useEffect(() => {
     const fetchHotels = async () => {
         try {
             const { data } = await axios.get('${import.meta.env.VITE_API_URL}/api/hotels/owner', {
                 headers: { Authorization: `Bearer ${token}` }
             });
             if (data.success && data.hotels.length > 0) {
                 setUserHotels(data.hotels);
                 // Default to first hotel
                 const firstHotel = data.hotels[0];
                 setHotelInputs({
                     name: firstHotel.name,
                     contact: firstHotel.contact,
                     address: firstHotel.address,
                     city: firstHotel.city
                 });
                 setIsNewHotel(false);
             } else {
                 setIsNewHotel(true);
             }
         } catch (e) {
             console.error(e);
             setFetchError(true);
             setIsNewHotel(true);
             if (e.response && e.response.status === 404) {
                 toast.error("Vui lòng khởi động lại server để cập nhật tính năng mới!");
             }
         } finally {
             setLoadingHotel(false);
         }
     }
     if(token) fetchHotels();
  }, [token, backendUrl]);

  const handleHotelSelect = (e) => {
      const selectedName = e.target.value;
      if (selectedName === 'new') {
          setIsNewHotel(true);
          setHotelInputs({ name: '', contact: '', address: '', city: '' });
      } else {
          setIsNewHotel(false);
          const hotel = userHotels.find(h => h.name === selectedName);
          if (hotel) {
              setHotelInputs({
                  name: hotel.name,
                  contact: hotel.contact,
                  address: hotel.address,
                  city: hotel.city
              });
          }
      }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('roomType', inputs.roomType);
        formData.append('pricePerNight', inputs.pricePerNight);
        formData.append('description', inputs.description);
        
         // Hotel Data
         formData.append('hotelName', hotelInputs.name);
         formData.append('hotelContact', hotelInputs.contact);
         formData.append('hotelAddress', hotelInputs.address);
         formData.append('hotelCity', hotelInputs.city);

         // Filter selected amenities
         const selectedAmenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key]);
         formData.append('amenities', JSON.stringify(selectedAmenities));

         // Append images
         if(images[1]) formData.append('images', images[1]);
         if(images[2]) formData.append('images', images[2]);
         if(images[3]) formData.append('images', images[3]);
         if(images[4]) formData.append('images', images[4]);

         const { data } = await axios.post('${import.meta.env.VITE_API_URL}/api/rooms', formData, {
             headers: { Authorization: `Bearer ${token}` }
         });

         if(data.success) {
             toast.success(data.message);
             // Reset
             setImages({ 1: null, 2: null, 3: null, 4: null });
             setInputs({ ...inputs, roomType: '', pricePerNight: 0, description: '' });
             setHotelInputs({ name: '', contact: '', address: '', city: '' });
             navigate('/owner/list-room');
         } else {
             toast.error(data.message);
         }

    } catch (error) {
        toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-outfit">
      <form onSubmit={onSubmitHandler} className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-10 text-white">
             <Title 
                title='Đăng ký Khách sạn & Thêm Phòng' 
                subTitle='Nhập thông tin khách sạn và chi tiết phòng để bắt đầu kinh doanh.'
                color="text-white"
             />
        </div>

        <div className="p-8 space-y-10">
            {/* Section 1: Hotel Information */}
            <section>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b pb-4">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                        Thông tin Khách sạn
                    </h3>
                    
                    {userHotels.length > 0 && (
                        <div className="mt-4 md:mt-0">
                             <select 
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 shadow-sm transition-all hover:bg-white' 
                                onChange={handleHotelSelect} 
                                value={isNewHotel ? 'new' : hotelInputs.name}
                             >
                                {userHotels.map(h => (
                                    <option key={h._id} value={h.name}>{h.name}</option>
                                ))}
                                <option value="new">Đăng ký Khách sạn mới</option>
                            </select>
                        </div>
                    )}
                </div>

                {fetchError && (
                    <div className="mb-6 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                        <span className="font-medium">Lỗi kết nối!</span> Server chưa cập nhật endpoint mới. Vui lòng tắt và khởi động lại Backend Server.
                    </div>
                )}

                <div className={`transition-all duration-300 ${!isNewHotel ? 'opacity-70 grayscale-[0.5]' : ''}`}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tên khách sạn</label>
                            <input 
                                required={isNewHotel} 
                                readOnly={!isNewHotel}
                                type="text" 
                                className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3 transition-all ${!isNewHotel ? 'bg-gray-100' : 'bg-white'}`}
                                placeholder="VD: Khách sạn Mường Thanh" 
                                value={hotelInputs.name} 
                                onChange={e => setHotelInputs({...hotelInputs, name: e.target.value})} 
                            />
                        </div>
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                            <input 
                                required={isNewHotel} 
                                readOnly={!isNewHotel}
                                type="text" 
                                className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3 transition-all ${!isNewHotel ? 'bg-gray-100' : 'bg-white'}`}
                                placeholder="VD: 0901234567" 
                                value={hotelInputs.contact} 
                                onChange={e => setHotelInputs({...hotelInputs, contact: e.target.value})} 
                            />
                        </div>
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Thành phố</label>
                             <select 
                                required={isNewHotel} 
                                disabled={!isNewHotel}
                                className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3 transition-all ${!isNewHotel ? 'bg-gray-100' : 'bg-white'}`}
                                value={hotelInputs.city} 
                                onChange={e => setHotelInputs({...hotelInputs, city: e.target.value})}
                             >
                                <option value="">Chọn Thành phố</option>
                                {["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Nha Trang", "Phú Quốc", "Đà Lạt", "Vũng Tàu","Hội An","Phan Thiết","Phú Yên","Hạ Long", "Cần Thơ","SaPa","Hải Phòng","Gia Lai"].map(c => 
                                    <option key={c} value={c}>{c}</option>
                                )}
                            </select>
                        </div>
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ chi tiết</label>
                            <input 
                                required={isNewHotel} 
                                readOnly={!isNewHotel}
                                type="text" 
                                className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3 transition-all ${!isNewHotel ? 'bg-gray-100' : 'bg-white'}`}
                                placeholder="Số nhà, đường, phường..." 
                                value={hotelInputs.address} 
                                onChange={e => setHotelInputs({...hotelInputs, address: e.target.value})} 
                            />
                        </div>
                    </div>
                </div>
            </section>

             {/* Section 2: Room Information */}
             <section className='pt-6 border-t border-gray-100'>
                 <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Thông tin Phòng
                 </h3>

                 <div className="space-y-6">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Hình ảnh phòng</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                             {Object.keys(images).map((key)=>(
                                <label 
                                    htmlFor={`roomImage${key}`} 
                                    key={key} 
                                    className="relative group cursor-pointer border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition-colors bg-gray-50 hover:bg-gray-100 flex items-center justify-center aspect-square overflow-hidden"
                                >
                                    {images[key] ? (
                                        <img className='w-full h-full object-cover group-hover:opacity-80 transition-opacity' src={URL.createObjectURL(images[key])} alt={`Room ${key}`}/>
                                    ) : (
                                        <div className="flex flex-col items-center p-2 text-center">
                                            <img src={assets.uploadArea} className="w-8 h-8 opacity-40 mb-2 group-hover:scale-110 transition-transform" alt="Upload" />
                                            <span className="text-xs text-gray-500 font-medium">Ảnh {key}</span>
                                        </div>
                                    )}
                                    <input type="file" accept='image/*' id={`roomImage${key}`} hidden onChange={e=> setImages({...images, [key]: e.target.files[0]})}/>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Room Type & Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Loại phòng</label>
                            <select 
                                required 
                                value={inputs.roomType} 
                                onChange={e=> setInputs({...inputs, roomType: e.target.value})} 
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3"
                            >
                                <option value="">Chọn loại phòng</option>
                                <option value="Phòng đơn">Phòng đơn</option>
                                <option value="Phòng đôi">Phòng đôi</option>
                                <option value="Phòng Vip">Phòng Vip</option>
                                <option value="Căn hộ cho gia đình">Căn hộ cho gia đình</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Giá phòng (VND/đêm)</label>
                            <input 
                                required 
                                type="number" 
                                placeholder='0' 
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={inputs.pricePerNight} 
                                onChange={e=> setInputs({...inputs, pricePerNight: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả chi tiết</label>
                         <textarea 
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3 min-h-[120px]" 
                            rows={4} 
                            placeholder="Mô tả không gian, tiện ích đặc biệt, view nhìn..." 
                            value={inputs.description} 
                            onChange={e => setInputs({...inputs, description: e.target.value})}
                        />
                    </div>

                    {/* Amenities */}
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-3">Tiện nghi có sẵn</label>
                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {Object.keys(inputs.amenities).map((amenity, index)=>(
                                <div key={index} className="flex items-center">
                                     <input 
                                        type="checkbox" 
                                        id={`amenities${index+1}`} 
                                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded cursor-pointer"
                                        checked={inputs.amenities[amenity]} 
                                        onChange={()=>setInputs({...inputs,amenities: {...inputs.amenities, [amenity]: !inputs.amenities[amenity]}})}
                                     />
                                    <label htmlFor={`amenities${index+1}`} className="ml-2 block text-sm text-gray-600 cursor-pointer select-none hover:text-gray-900 transition-colors">
                                        {amenity}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
             </section>
        </div>

        {/* Footer Action */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex justify-end">
             <button className='bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto'>
                {isNewHotel ? 'Đăng Ký Khách Sạn & Thêm Phòng' : 'Thêm Phòng vào Khách Sạn'}
            </button>
        </div>

      </form>
    </div>
  )
}

export default AddRoom
