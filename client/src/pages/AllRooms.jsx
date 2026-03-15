import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { assets, facilityIcons,testimonials} from "../assets/assets";
import { useAppContext } from "../conext/AppContext";
import { toast } from "react-hot-toast";


const CheckBox = ({label,selected = false, onChange = ()=>{ }})=>{
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
            <input type="checkbox" checked={selected} 
            onChange={(e)=>onChange(e.target.checked, label)}/>
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton = ({label,selected = false, onChange = ()=>{}})=>{
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
            <input type="radio" name="sortOption" checked={selected} 
            onChange={(e)=> onChange(label)}/>
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const AllRooms = () => {
  const navigate = useNavigate();
  const { axios } = useAppContext();
  const [searchParams] = useSearchParams();
  const [openFilters, setOpenFilters] = useState(false);
  const [allRooms, setAllRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortType, setSortType] = useState("");

  const fetchRooms = async () => {
    try {
        const { data } = await axios.get('${import.meta.env.VITE_API_URL}/api/rooms');
        if (data.success) {
            setAllRooms(data.rooms);
            setFilteredRooms(data.rooms);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

 
  const roomTypes = [
    "Phòng đơn",
    "Phòng đôi",
    "Phòng Vip",
    "Căn hộ cho gia đình",
  ];
  const priceRanges =[
    '0VND - 1.000.000VND',
    '1.000.000VND - 3.000.000VND',
    '3.000.000VND - 5.000.000VND',
    '5.000.000VND - 10.000.000VND',
    '10.000.000VND trở lên'
  ];
  const sortOption =[
    "Giá từ thấp đến cao",
    "Giá từ cao xuống thấp",
    "Lựa chọn tốt nhất",
    "Mới nhất",
  ]

  // Filter Logic
  useEffect(()=>{
    let tempRooms = [...allRooms];

    // 1. Search Param: Location
    const locationParam = searchParams.get('location');
    if (locationParam) {
        tempRooms = tempRooms.filter(room => {
            const city = room.hotel?.city?.toLowerCase() || '';
            const address = room.hotel?.address?.toLowerCase() || '';
            const query = locationParam.toLowerCase();
            return city.includes(query) || address.includes(query);
        });
    }

    // 2. Search Param: Guests
    const guestsParam = searchParams.get('guests');
    if (guestsParam) {
        const guests = parseInt(guestsParam);
        // Simple heuristic: 
        // 1-2 guests: Any room
        // 3-4 guests: "Phòng đôi", "Phòng Vip", "Căn hộ"
        // 5+ guests: "Căn hộ"
        if (guests > 2) {
             tempRooms = tempRooms.filter(room => {
                 const type = room.roomType;
                 return type === 'Phòng đôi' || type === 'Phòng Vip' || type === 'Căn hộ cho gia đình';
             });
        }
        if (guests > 4) {
             tempRooms = tempRooms.filter(room => room.roomType === 'Căn hộ cho gia đình');
        }
    }

    // 2.5 Search Param: Search Text (Name, City, Address)
    const searchParam = searchParams.get('search');
    if (searchParam) {
        const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
        }
        const query = removeAccents(searchParam.toLowerCase());
        tempRooms = tempRooms.filter(room => {
            const hotelName = removeAccents(room.hotel?.name?.toLowerCase() || '');
            const city = removeAccents(room.hotel?.city?.toLowerCase() || '');
            const address = removeAccents(room.hotel?.address?.toLowerCase() || '');
            return hotelName.includes(query) || city.includes(query) || address.includes(query);
        });
    }

    // 3. Sidebar Filter: Type
    if (selectedTypes.length > 0) {
        tempRooms = tempRooms.filter(room => selectedTypes.includes(room.roomType));
    }

    // Filter by Price
    if (selectedPrices.length > 0) {
        tempRooms = tempRooms.filter(room => {
            const roomPrice = room.pricePerNight;
            return selectedPrices.some(range => {
                if (range === '10.000.000VND trở lên') {
                    return roomPrice >= 10000000;
                }
                const parts = range.split(' - ');
                const min = parseInt(parts[0].replace(/\./g, ''));
                const max = parseInt(parts[1].replace(/\./g, ''));
                return roomPrice >= min && roomPrice <= max;
            });
        });
    }

    // Sort
    if (sortType) {
        switch (sortType) {
            case "Giá từ thấp đến cao":
                tempRooms.sort((a,b) => a.pricePerNight - b.pricePerNight);
                break;
            case "Giá từ cao xuống thấp":
                tempRooms.sort((a,b) => b.pricePerNight - a.pricePerNight);
                break;
            case "Mới nhất":
                tempRooms.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break;
        }
    }

    setFilteredRooms(tempRooms);

  },[allRooms, selectedTypes, selectedPrices, sortType])

  const handleTypeChange = (checked, type) => {
      setSelectedTypes(prev => checked ? [...prev, type] : prev.filter(t => t !== type));
  }

  const handlePriceChange = (checked, price) => {
      setSelectedPrices(prev => checked ? [...prev, price] : prev.filter(p => p !== price));
  }

  const clearFilters = () => {
      setSelectedTypes([]);
      setSelectedPrices([]);
      setSortType("");
  }

  return (
   
      <div className="pt-20">
      {/* Featured Section */}
      <div className="relative h-[400px] mb-12">
        <img src={assets.heroImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">Khám Phá Kỳ Nghỉ Mơ Ước</h1>
          <p className="text-lg md:text-xl max-w-2xl">Trải nghiệm sự sang trọng và tiện nghi đẳng cấp tại các khách sạn hàng đầu của chúng tôi.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-16 lg:px-24 xl:px-24"></div>
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between md:pt-5 px-4 md:px-16 lg:px-24 xl:px-24">
      <div className="w-full lg:w-3/4"> 
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">Danh Sách Phòng Khách Sạn</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
          Tạm gác lại những bộn bề và tận hưởng khoảnh khắc bình yên trong không gian nghỉ dưỡng ấm cúng.
Chúng tôi mang đến những tiện ích vượt mong đợi để mỗi kỳ nghỉ của bạn thật trọn vẹn.
           </p>
        </div>

        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
          >
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt="hotel-img"
              title="View Room details"
              className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
            />

            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel?.address || room.hotel?.city}</p> 
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                className="text-gray-800 text-3xl font-playfair cursor-pointer"
              >
                {room.hotel?.name || "Hotel Name"}
              </p>

              <div className="flex items-center">
                <div className="flex text-amber-500 text-sm">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.round(room.averageRating || 0) ? "text-amber-500" : "text-gray-300"}>★</span>
                    ))}
                </div>
                <p className="ml-2 text-sm text-gray-600">{room.totalReviews || 0} lượt đánh giá</p>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4" />
                <span>{room.hotel?.address}</span>
              </div>
              {/* Room Amennities */}
              <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                    {room.amenities.map((item,index)=>(
                        <div key={index} className="flex items-center gap-1">
                            <img src={facilityIcons[item]} alt={item}
                            className='w-5 h-5'/>
                            <p className='text-xs'>{item}</p>
                        </div>
                    ))}
              </div>
              {/*Room Price per Night */}
              <div className="flex items-center justify-between mt-2">
                  <p className='text-xl front-medium text-gray-700'>{room.pricePerNight?.toLocaleString()} VND/Đêm</p>
                    <button 
                        onClick={() => {
                            navigate(`/rooms/${room._id}`);
                            scrollTo(0, 0);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                    Xem chi tiết
                    </button>
              </div>
            </div>
          </div>
        ))}
         {filteredRooms.length === 0 && <p className="mt-10 text-center text-gray-500">Không tìm thấy phòng phù hợp...</p>}
      </div>
      {/* Filters */}
      <div className='bg-white w-80 border border-gray-300 text-gray-600
      max-lg:mb-8 lg:mt-16'>
      <div className={`flex items-center justify-between px-5 py-2.5
       lg:border-b border-gray-300 ${openFilters && "border-b"}`}>
        <p className='text-base font-medium text-gray-800'>Lọc</p>
        <div className='text-xs cursor-pointer'>
            <span onClick={()=> setOpenFilters(!openFilters)}
            className='lg:hidden'>
            {openFilters ? 'HIDE': 'SHOW'}</span>
            <span className='hidden lg:block' onClick={clearFilters}>Xóa</span>
        </div>
      </div>

      <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"}
      overflow-hidden transition-all duration-700`}>
        <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Hạng phòng</p>
            {roomTypes.map((room,index)=>(
            <CheckBox key={index} label={room} selected={selectedTypes.includes(room)} onChange={handleTypeChange}/>
            ))}
        </div>
        <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Hạng giá</p>
            {priceRanges.map((range,index)=>(
                <CheckBox key={index} label={`${range}`} selected={selectedPrices.includes(range)} onChange={handlePriceChange}/>
            ))}    
        </div>
        <div className='px-5 pt-5 pb-7'>
            <p className='font-medium text-gray-800 pb-2'>Sắp xếp</p>
            {sortOption.map((option,index)=>(
                <RadioButton key={index} label={option} selected={sortType === option} onChange={setSortType}/>
            ))}    
        </div>
      </div>
      </div>
    </div>
      </div>
  );
};

export default AllRooms;
