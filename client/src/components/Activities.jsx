import React from 'react';
import { avatars } from "../assets/assets";

const Activities = () => {
    const activities = [
        {
            id: 1,
            title: "Tour tham quan thành phố",
            description: "Khám phá những địa điểm nổi tiếng và văn hóa đặc sắc của thành phố. Hướng dẫn viên chuyên nghiệp sẽ đưa bạn đến những góc khuất thú vị mà ít người biết đến.",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            price: "500.000 VNĐ/người",
            duration: "4 giờ"
        },
        {
            id: 2,
            title: "Thư giãn tại Spa",
            description: "Tận hưởng những liệu pháp massage thư giãn và chăm sóc sức khỏe. Sử dụng các sản phẩm từ thiên nhiên giúp bạn phục hồi năng lượng sau những ngày dài.",
            image: "https://th.bing.com/th/id/OIP.9PHlHhUe07IyLD4i17LmjwHaE7?w=272&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            price: "800.000 VNĐ/liệu trình",
            duration: "90 phút"
        },
        {
            id: 3,
            title: "Lớp học nấu ăn",
            description: "Học cách chế biến những món ăn địa phương ngon miệng. Bạn sẽ được tự tay đi chợ chọn nguyên liệu và nấu ăn dưới sự hướng dẫn của đầu bếp.",
            image: "https://th.bing.com/th/id/OIP.GU7KD0YVFEWPW4HZBBEZaQHaE8?w=276&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            price: "600.000 VNĐ/người",
            duration: "3 giờ"
        },
        {
            id: 4,
            title: "Tiệc nướng BBQ bãi biển",
            description: "Thưởng thức hải sản tươi ngon bên bờ biển thơ mộng. Không gian lãng mạn với ánh nến và tiếng sóng biển rì rào.",
            image: "https://th.bing.com/th/id/OIP.8PkKhqQsKFPtz85_StT6vgHaE8?w=286&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            price: "1.200.000 VNĐ/người",
            duration: "3 giờ"
        },
        {
            id: 5,
            title: "Lặn ngắm san hô",
            description: "Khám phá thế giới đại dương đầy màu sắc. Trang thiết bị hiện đại và an toàn tuyệt đối cho người mới bắt đầu.",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            price: "900.000 VNĐ/người",
            duration: "5 giờ"
        },
        {
            id: 6,
            title: "Leo núi ngắm bình minh",
            description: "Chinh phục đỉnh núi cao và đón những tia nắng đầu tiên trong ngày. Một trải nghiệm tuyệt vời cho những ai yêu thích thiên nhiên.",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            price: "400.000 VNĐ/người",
            duration: "4 giờ"
        }
    ];

    const reviews = [
        {
            id: 1,
            user: "Ngọc Minh",
            avatar: avatars.avt1,
            rating: 5,
            comment: "Tour tham quan thành phố rất thú vị, hướng dẫn viên nhiệt tình và am hiểu kiến thức."
        },
        {
            id: 2,
            user: "Giỏi Lee",
            avatar: avatars.avt2,
            rating: 5,
            comment: "Dịch vụ Spa tuyệt vời, nhân viên tay nghề cao, không gian thư giãn."
        },
        {
            id: 3,
            user: "Anh Họ",
            avatar: avatars.avt3,
            rating: 4,
            comment: "Tiệc BBQ bãi biển rất lãng mạn, đồ ăn ngon nhưng hơi ít món tráng miệng."
        }
    ];

    return (
        // Thêm class 'pt-20' vào div container chính để tạo khoảng đệm trên (padding-top) 
        // bằng với chiều cao của Navbar cố định, giúp nội dung không bị che.
        <div className='container mx-auto px-4 py-12 pt-20'>
            {/* Hero Section */}
            <div className='text-center mb-16'>
                <h1 className='text-4xl font-bold text-gray-800 mb-4'>Hoạt động nổi bật</h1>
                <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
                    Trải nghiệm những hoạt động thú vị và đáng nhớ trong kỳ nghỉ của bạn. Chúng tôi cung cấp đa dạng các loại hình giải trí phù hợp với mọi lứa tuổi.
                </p>
            </div>

            {/* Activities Grid */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-24'>
                {activities.map((activity) => (
                    <div key={activity.id} className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col'>
                        <div className='relative h-64 overflow-hidden'>
                            <img src={activity.image} alt={activity.title} className='w-full h-full object-cover hover:scale-110 transition-transform duration-500' />
                            <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-sm'>
                                {activity.duration}
                            </div>
                        </div>
                        <div className='p-6 flex-1 flex flex-col'>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>{activity.title}</h3>
                            <p className='text-gray-600 text-sm mb-4 flex-1'>{activity.description}</p>
                            <div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-100'>
                                <span className='text-blue-600 font-bold text-lg'>{activity.price}</span>
                                <button className='px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors'>
                                    Đăng kí trực tiếp tại quầy
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Seasonal Specials */}
            <div className='bg-blue-50 rounded-2xl p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center gap-12'>
                <div className='flex-1 space-y-6'>
                    <span className='text-blue-600 font-bold tracking-wider uppercase text-sm'>Ưu đãi mùa hè</span>
                    <h2 className='text-3xl font-bold text-gray-800'>Giảm giá 20% cho tất cả các hoạt động dưới nước</h2>
                    <p className='text-gray-600 text-lg'>
                        Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt. Chương trình áp dụng cho nhóm từ 4 người trở lên. Đừng bỏ lỡ cơ hội trải nghiệm mùa hè tuyệt vời!
                    </p>
                    <button className='bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30'>
                        Đăng ký ngay
                    </button>
                </div>
                <div className='flex-1'>
                    <img src="https://i.pinimg.com/736x/f0/24/18/f0241884d95f2aedca35dbbac6795d44.jpg" alt="Summer Special" className='rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500' />
                </div>
            </div>

            {/* Reviews */}
            <div>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-4'>Đánh giá từ khách hàng</h2>
                    <p className='text-gray-600'>Khách hàng nói gì về trải nghiệm của họ</p>
                </div>
                <div className='grid md:grid-cols-3 gap-8'>
                    {reviews.map(review => (
                        <div key={review.id} className='bg-white p-8 rounded-xl shadow-lg border border-gray-100'>
                            <div className='flex items-center gap-4 mb-4'>
                                <img
                                    src={review.avatar}
                                    alt={review.user}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className='font-bold text-gray-800'>{review.user}</h4>
                                    <div className='flex text-yellow-400 text-sm'>
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className='text-gray-600 italic'>"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Activities;