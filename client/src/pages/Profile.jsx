
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../conext/AppContext';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, fetchUserProfile } from '../redux/authSlice';
import { toast } from 'react-hot-toast';
import { assets } from '../assets/assets';

const Profile = () => {
    const { axios, navigate } = useAppContext();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
            setAddress(user.address || '');
        } else {
             navigate('/login');
        }
    }, [user, navigate]);


    const handleSave = async () => {
        try {
            // Use JSON instead of FormData since we are not uploading files anymore
            const { data } = await axios.post('/api/users/profile', { username, phone, address }, {
                 headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                 }
            });

            if (data.success) {
                toast.success(data.message);
                setIsEditing(false);
                dispatch(fetchUserProfile()); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='min-h-screen pt-24 pb-10 px-4 flex justify-center bg-gray-50'>
            <div className='bg-white p-8 rounded-xl shadow-md w-full max-w-2xl'>
                 <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-2xl font-bold text-gray-800'>Hồ sơ cá nhân</h1>
                    <button 
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={`px-6 py-2 rounded-full font-medium transition-colors ${isEditing ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                        {isEditing ? 'Lưu thay đổi' : 'Chỉnh sửa'}
                    </button>
                </div>

                <div className='flex flex-col md:flex-row gap-8'>
                    {/* Details Section */}
                    <div className='flex-1 flex flex-col gap-5'>
                         <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Họ và tên</label>
                            <input 
                                disabled={!isEditing}
                                className={`w-full p-3 border rounded-lg outline-none ${isEditing ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-100' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                         <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                            <input 
                                disabled={true} 
                                className='w-full p-3 border rounded-lg outline-none bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
                                type="email" 
                                value={email} 
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Số điện thoại</label>
                            <input 
                                disabled={!isEditing}
                                className={`w-full p-3 border rounded-lg outline-none ${isEditing ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-100' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                                type="text" 
                                value={phone} 
                                placeholder="Thêm số điện thoại"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Địa chỉ</label>
                             <input 
                                disabled={!isEditing}
                                className={`w-full p-3 border rounded-lg outline-none ${isEditing ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-100' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                                type="text" 
                                value={address} 
                                placeholder="Thêm địa chỉ"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
