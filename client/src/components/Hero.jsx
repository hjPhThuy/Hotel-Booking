import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [guests, setGuests] = useState(1);
    const [dateIn, setDateIn] = useState('');
    const [dateOut, setDateOut] = useState('');

    const handleSearch = (e) => {
        e.preventDefault(); 
        navigate(`/rooms?location=${destination}&guests=${guests}`);
    }

    return (
        <div className=' flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
            <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>Hành trình của bạn bắt đầu từ đây. Hàng ngàn lựa chọn lưu trú cao cấp đang chờ đón</p>
            <h1 className='font-Playfair text-2x1 md:text-5x1 md:text-[56px] md:leading-14 font-bold md:font-extrabold max-w-xl mt-4'>Khám Phá & Đặt Ngay </h1>
            <p className='max-w-130 mt-2 text-sm md:text-base'>QuickStay mang đến cho bạn bộ sưu tập những nơi nghỉ dưỡng tinh hoa và độc đáo nhất. Từ các khách sạn 5 sao lộng lẫy đến những khu nghỉ dưỡng biệt lập, chúng tôi cam kết biến chuyến đi của bạn thành một trải nghiệm đáng nhớ. Hãy bắt đầu hành trình của sự thư thái và khám phá ngay hôm nay! </p>
            <form onSubmit={handleSearch} className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" className='h-4'/>
                    <label htmlFor="destinationInput">Địa điểm</label>
                </div>
                <input 
                    list='destinations' 
                    id="destinationInput" 
                    type="text" 
                    className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" 
                    placeholder="Nhập vào đây" 
                    required 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                <datalist id='destinations'>
                    {cities.map((city, index)=>(
                        <option value={city} key={index}/>
                    ))}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" className='h-4'/>
                    <label htmlFor="checkIn">Ngày nhận phòng</label>
                </div>
                <input 
                    id="checkIn" 
                    type="date" 
                    className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" 
                    value={dateIn}
                    onChange={(e) => setDateIn(e.target.value)}
                />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    
                    <label htmlFor="checkOut">Ngày trả phòng</label>
                </div>
                <input 
                    id="checkOut" 
                    type="date" 
                    className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" 
                    value={dateOut}
                    onChange={(e) => setDateOut(e.target.value)}
                />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Số người</label>
                <input 
                    min={1} 
                    max={10} 
                    id="guests" 
                    type="number" 
                    className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" 
                    placeholder="0" 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                />
            </div>

            <button type="submit" className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <img src={assets.searchIcon} alt="" className='h-7'/>
                <span>Tìm ngay</span>
            </button>
        </form>

        </div>
    )
}

export default Hero