import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Nguyễn Văn Phúc",
            role: "CEO & Founder",
            image: "https://vcdn1-giadinh.vnecdn.net/2024/10/17/khoai-lang-thang-anh-de-cu-2-1-6386-5387-1729153522.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=t6i2LbSyJvGon0LEM649Mg"
        },
        {
            id: 2,
            name: "Nguyễn Đức Duy",
            role: "Giám đốc điều hành",
            image: "https://vcdn1-giadinh.vnecdn.net/2024/10/17/khoai-lang-thang-anh-de-cu-4-1-2098-2521-1729153521.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=6281Who1XY20tr4dxxg8Dw"
        },
        {
            id: 3,
            name: "Đàm Quốc Khánh",
            role: "Trưởng phòng Marketing",
            image: "https://vcdn1-giadinh.vnecdn.net/2024/12/01/457025968-1059575532193283-683-3382-5860-1732995008.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=xMuEQusaFak57OYdlAMAzA"
        }
    ];

    return (
        <div className='container mx-auto px-4 py-12 pt-20'>
            {/* Hero Section */}
            <div className='text-center mb-16'>
                <h1 className='text-4xl font-bold text-gray-800 mb-4'>Về chúng tôi</h1>
                <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
                    Chào mừng bạn đến với nền tảng đặt phòng khách sạn hàng đầu. Chúng tôi cam kết mang đến cho bạn những trải nghiệm nghỉ dưỡng tuyệt vời nhất với dịch vụ chuyên nghiệp và tận tâm.
                </p>
            </div>

            {/* Mission & Vision */}
            <div className='grid md:grid-cols-2 gap-12 items-center mb-20'>
                <div>
                    <img
                        src= "https://i.pinimg.com/1200x/c3/84/fd/c384fd6d00fb18de4eefb82e8196d090.jpg"
                        alt="About Us"
                        className='rounded-xl shadow-2xl w-full h-[500px] object-cover'
                    />
                </div>
                <div className='space-y-8'>
                    <div>
                        <h3 className='text-3xl font-bold text-gray-800 mb-4'>Sứ mệnh của chúng tôi</h3>
                        <p className='text-gray-600 leading-relaxed text-xl'>
                            Kết nối du khách với những khách sạn tốt nhất, đảm bảo giá cả hợp lý và quy trình đặt phòng đơn giản, nhanh chóng. Chúng tôi không chỉ cung cấp chỗ ở, mà còn mang đến những trải nghiệm đáng nhớ.
                        </p>
                    </div>
                    <div>
                        <h3 className='text-3xl font-bold text-gray-800 mb-4'>Giá trị cốt lõi</h3>
                        <ul className='space-y-4'>
                            <li className='flex items-start'>
                                <span className='bg-blue-100 text-blue-600 p-2 rounded-full mr-4'>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </span>
                                <div>
                                    <h4 className='font-semibold text-gray-800'>Khách hàng là trọng tâm</h4>
                                    <p className='text-gray-500 text-sm'>Luôn lắng nghe và đáp ứng mọi nhu cầu của khách hàng.</p>
                                </div>
                            </li>
                            <li className='flex items-start'>
                                <span className='bg-blue-100 text-blue-600 p-2 rounded-full mr-4'>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </span>
                                <div>
                                    <h4 className='font-semibold text-gray-800'>Minh bạch và Tin cậy</h4>
                                    <p className='text-gray-500 text-sm'>Thông tin rõ ràng, giá cả minh bạch, không phí ẩn.</p>
                                </div>
                            </li>
                            <li className='flex items-start'>
                                <span className='bg-blue-100 text-blue-600 p-2 rounded-full mr-4'>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </span>
                                <div>
                                    <h4 className='font-semibold text-gray-800'>Đổi mới không ngừng</h4>
                                    <p className='text-gray-500 text-sm'>Luôn cập nhật công nghệ mới để cải thiện trải nghiệm người dùng.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Our Team */}
            <div className='mb-20'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-4'>Đội ngũ lãnh đạo</h2>
                    <p className='text-gray-600 pl-50 pr-50 text-xl'>Chúng tôi là những con người luôn đặt trải nghiệm khách hàng làm trọng tâm.
Với sự kết hợp giữa tầm nhìn chiến lược, tinh thần sáng tạo và kinh nghiệm thực tiễn, đội ngũ lãnh đạo cam kết mang đến dịch vụ tốt nhất và liên tục đổi mới để nâng tầm chất lượng hệ thống khách sạn.</p>
                </div>
                <div className='grid md:grid-cols-3 gap-8'>
                    {teamMembers.map(member => (
                        <div key={member.id} className='bg-white rounded-xl shadow-lg overflow-hidden text-center group hover:-translate-y-2 transition-transform duration-300'>
                            <div className='relative h-80 overflow-hidden'>
                                <img src={member.image} alt={member.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                            </div>
                            <div className='p-6'>
                                <h3 className='text-xl font-bold text-gray-800'>{member.name}</h3>
                                <p className='text-blue-600 font-medium'>{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact CTA */}
            <div className='bg-gray-900 rounded-2xl p-12 text-center text-white relative overflow-hidden'>
                <div className='relative z-10'>
                    <h2 className='text-3xl font-bold mb-6'>Bạn cần hỗ trợ?</h2>
                    <p className='text-gray-300 mb-8 max-w-2xl mx-auto'>
                        Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn 24/7. Hãy liên hệ ngay để được tư vấn tốt nhất.
                    </p>
                    <button className='bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors'>
                        Liên hệ ngay
                    </button>
                </div>
                <div className='absolute top-0 left-0 w-full h-full opacity-10 bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]'></div>
            </div>
        </div>
    );
};

export default About;
