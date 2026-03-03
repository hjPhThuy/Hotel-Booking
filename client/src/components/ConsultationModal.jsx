import React, { useState } from 'react';
import { useAppContext } from '../conext/AppContext';
import { toast } from 'react-hot-toast';

const ConsultationModal = ({ isOpen, onClose, room }) => {
    const { axios } = useAppContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // Default dates for consultation request if not picked
    const [checkInDate] = useState(new Date().toISOString().split('T')[0]);
    const [checkOutDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/bookings/book', {
                room: room._id,
                name,
                email,
                phone,
                checkInDate,
                checkOutDate,
                guests: 1 // Default
            });

            if (data.success) {
                toast.success('Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm.');
                onClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl relative animate-fadeIn">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                    &times;
                </button>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký yêu cầu đặt phòng</h2>
                <p className="text-sm text-gray-500 mb-6">Để lại thông tin, chúng tôi sẽ liên hệ để tư vấn xác nhận đặt phòng {room?.hotel?.name}.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                        <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Nguyễn Văn A"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                        <input 
                            type="tel" 
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="09xxx"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="email@example.com"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="mt-2 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all active:scale-95"
                    >
                        Gửi yêu cầu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConsultationModal;
