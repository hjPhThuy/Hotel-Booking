import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import googleIcon from './googleIcon.svg' // Import Google Icon
import freeWifiIcon from './freeWifiIcon.svg'
// ...

import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";
import heroImage from "./heroImage.png";
import cancelIcon from "./cancel.svg";
import carIcon from "./car.svg";
import iconReceptionist from "./receptionist.svg";
import barIcon from "./bar-11.svg";
import spaIcon from "./spa.svg";
import balconyIcon from "./balcony-rounded.svg";
import waiterIcon from "./waiter.svg";
import qrcode from "./qr.jpg"

export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    googleIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
    heroImage,
    cancelIcon,
    carIcon,
    iconReceptionist,
    barIcon,
    spaIcon,
    balconyIcon,
    waiterIcon,
    qrcode,
    qr: qrcode
}

export const avatars = {
    avt1: userIcon,
    avt2: userIcon,
    avt3: userIcon,
    banner: heroImage,
    qr: qrcode
}

export const cities = [
    "Phú Quốc",
    "Hồ Chí Minh",
    "Huế",
    "Đà Nẵng",
    "Hội An",
    "Nha Trang",
    "Đà Lạt",
    "Hà Nội",
    "Cần Thơ",
    "Hạ Long",
    "Bình Định",
    "Đồng Nai",
    "ĐăkLăk",
    "Phú Yên",
    "Thái Nguyên",
    "Vũng Tàu",
    "Bình Thuận",
    "Bình Dương",
    "Bình Phước",

];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    { _id: 1, title: "Gói Hè Rực Rỡ", description: "Tận hưởng miễn phí một đêm nghỉ và bữa sáng hàng ngày khi đặt gói trọn gói này.", priceOff: 25, expiryDate: "31/09/2025", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Kỳ Nghỉ Lãng Mạn", description: "Gói đặc biệt dành cho các cặp đôi, bao gồm dịch vụ Spa thư giãn cao cấp", priceOff: 20, expiryDate: "30/07/2025", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Nghỉ Dưỡng Sang Trọng", description: "Đặt phòng trước 60 ngày để tiết kiệm lớn tại bất kỳ khu nghỉ dưỡng cao cấp nào của chúng tôi.", priceOff: 30, expiryDate: "01/10/2025", image: exclusiveOfferCardImg3 },
]

// Testimonials Dummy Data
export const testimonials = [
    { id: 1, name: "Nguyễn Đức Duy", address: "Tp Hồ Chí Minh", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "Tìm được một khách sạn ưng ý ở Đà Lạt cho chuyến đi gia đình chưa bao giờ dễ dàng đến thế! Giao diện QuickStay rất thân thiện, thông tin rõ ràng và tôi đã có một kỳ nghỉ tuyệt vời với mức giá rất hợp lý." },
    { id: 2, name: "Đàm Quốc Khánh", address: "Đà Nẵng", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "QuickStay vượt ngoài mong đợi của tôi. Quy trình đặt phòng diễn ra cực kỳ suôn sẻ, và các khách sạn đều là hàng đầu. Rất nên dùng!" },
    { id: 3, name: "Lâm Nguyễn Phương Thùy", address: "Đồng Nai", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Thường xuyên du lịch cuối tuần, tôi rất cần một nền tảng tìm kiếm nhanh. QuickStay cung cấp thông tin chi tiết và ảnh chụp thực tế rất rõ ràng, giúp tôi yên tâm chọn được resort ưng ý ở Phan Thiết. Quy trình thanh toán cũng cực kỳ tiện lợi!" }
];

// Facility Icon
export const facilityIcons = {
    "Miễn phí WiFi": assets.freeWifiIcon,
    "Miễn phí bữa sáng": assets.freeBreakfastIcon,
    "Dịch vụ phòng": assets.roomServiceIcon,
    "Khung cảnh đẹp": assets.mountainIcon,
    "Hồ bơi": assets.poolIcon,
    "Hủy phòng miễn phí": assets.cancelIcon,
    "Xe đưa đón miễn phí": assets.carIcon,
    "Lễ tân 24h": assets.waiterIcon,
    "Quầy bar": assets.barIcon,
    "Spa & Chăm sóc sức khỏe": assets.spaIcon,

    "Ban công": balconyIcon,
    "Ban công ": balconyIcon, // Fix for legacy data with trailing space

};

// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Nơi ở Sạch & An Toàn", description: "Không gian được duy trì tốt và vệ sinh chỉ dành cho bạn." },
    { icon: assets.badgeIcon, title: "Vệ Sinh Nâng Cao", description: "Chủ nhà này tuân thủ các tiêu chuẩn vệ sinh nghiêm ngặt của Staybnb." },
    { icon: assets.locationFilledIcon, title: "Vị Trí Tuyệt Vời", description: "90% khách đánh giá vị trí 5 sao." },
    { icon: assets.heartIcon, title: "Nhận Phòng Thuận Tiện", description: "100% khách đánh giá nhận phòng 5 sao." },
];

// User Dummy Data
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Great Stack",
    "email": "user.greatstack@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    "role": "hotelOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": [
        "New York"
    ]
}

// Hotel Dummy Data Common
const ownerDummy = userDummyData;

export const hotelDummyData1 = {
    "_id": "hotel_1_pq",
    "name": "Vinpearl Resort & Spa Phú Quốc",
    "address": "Bãi Dài, Gành Dầu, Phú Quốc, Kiên Giang",
    "contact": "0297 3550 550",
    "owner": ownerDummy,
    "city": "Phú Quốc",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "__v": 0
};

export const hotelDummyData2 = {
    "_id": "hotel_2_nt",
    "name": "Sheraton Nha Trang Hotel & Spa",
    "address": "26-28 Trần Phú, Lộc Thọ, Nha Trang, Khánh Hòa",
    "contact": "0258 3880 000",
    "owner": ownerDummy,
    "city": "Nha Trang",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "__v": 0
};

export const hotelDummyData3 = {
    "_id": "hotel_3_dl",
    "name": "Dalat Palace Heritage Hotel",
    "address": "2 Đường Trần Phú, Phường 3, Thành phố Đà Lạt, Lâm Đồng",
    "contact": "0263 3825 444",
    "owner": ownerDummy,
    "city": "Đà Lạt",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "__v": 0
};

export const hotelDummyData4 = {
    "_id": "hotel_4_dn",
    "name": "InterContinental Danang Sun Peninsula Resort",
    "address": "Bãi Bắc, Bán đảo Sơn Trà, Đà Nẵng",
    "contact": "0236 3938 888",
    "owner": ownerDummy,
    "city": "Đà Nẵng",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "__v": 0
};

export const hotelDummyData = hotelDummyData1; // Keep for backward compatibility if used elsewhere

// Rooms Dummy Data
export const roomsDummyData = [
    {
        "_id": "room_1_pq",
        "hotel": hotelDummyData1,
        "roomType": "Ocean View Villa",
        "pricePerNight": 4500000,
        "amenities": ["Hồ bơi riêng", "View biển", "Dịch vụ phòng 24/7"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "room_2_nt",
        "hotel": hotelDummyData2,
        "roomType": "Premium Ocean View",
        "pricePerNight": 3200000,
        "amenities": ["Spa", "View biển", "Gym"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "isAvailable": true,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "room_3_dl",
        "hotel": hotelDummyData3,
        "roomType": "Heritage Suite",
        "pricePerNight": 2800000,
        "amenities": ["Lò sưởi", "Vườn Thượng Uyển", "Trà chiều"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "room_4_dn",
        "hotel": hotelDummyData4,
        "roomType": "Son Tra Terrace Suite",
        "pricePerNight": 8500000,
        "amenities": ["Bãi biển riêng", "Nhà hàng La Maison 1888", "Spa"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z",
        "__v": 0
    }
]



// User Bookings Dummy Data
export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": userDummyData,
        "room": roomsDummyData[1],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": 299,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": true,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": userDummyData,
        "room": roomsDummyData[0],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": 399,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": userDummyData,
        "room": roomsDummyData[3],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-11T00:00:00.000Z",
        "checkOutDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": 199,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]

// Dashboard Dummy Data
export const dashboardDummyData = {
    "totalBookings": 3,
    "totalRevenue": 897,
    "bookings": userBookingsDummyData
}

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/