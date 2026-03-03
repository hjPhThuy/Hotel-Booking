import { assets, exclusiveOffers} from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import Title from './Title';

const ExclusiveOffers = () => {
    const navigate = useNavigate();
    return(
        <div className=' flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30'>
            <div className='flex flex-col md:flex-row items-center justify-between w-full'>
             <Title align='left' title='ƯU ĐÃI & GÓI NGHỈ DƯỠNG ĐẶC BIỆT' subTitle='Tận dụng các chương trình ưu đãi có giới hạn thời gian và gói dịch vụ đặc biệt của chúng tôi để nâng tầm chuyến đi và tạo nên những kỷ niệm khó quên.'/>
             <button onClick={()=>navigate('/activities')} className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12'>
            Xem Tất Cả Ưu Đãi
             <img src={assets.arrowIcon} alt="arrow-icon" className='group-hover:translate-x-1 transition-all'/>

             </button>

            
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
                {exclusiveOffers.map((item)=>(
                    <div key={item._id} className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 text-white bg-no-repeat bg-cover bg-center' style={{backgroundImage: `url(${item.image})`}}>
                        <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full'>{item.priceOff}%OFF</p>
                        <div>
                            <p className='text-2xl font-medium font-playfair'>{item.title}</p>
                            <p>{item.description}</p>
                            <p className='text-xs text-white/70 mt-3'>Hết hạn {item.expiryDate}</p>
                        </div>
                        <button onClick={()=>navigate('/activities')} className='flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5'>
                           Xem chi tiết ưu đãi
                            <img className='invert group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="arrow-icon"/>
                        </button>

                    </div>
                ))}

            </div>
       </div>
    )
}

export default ExclusiveOffers  