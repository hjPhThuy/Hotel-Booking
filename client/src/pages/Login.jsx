import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../conext/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectIsLoading } from '../redux/authSlice';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const { navigate, axios } = useAppContext(); 
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === 'Login') {
      try {
        const resultAction = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(resultAction)) {
          toast.success("Đăng nhập thành công!");
          const userRole = resultAction.payload.user.role;
          if (userRole === 'hotelOwner' || userRole === 'admin') {
              navigate('/owner');
          } else {
              navigate('/');
          }
        } else {
           toast.error(resultAction.payload || "Đăng nhập thất bại");
        }
      } catch (error) {
         toast.error(error.message);
      }
    } else {
      // Sign Up
      try {
        const { data } = await axios.post('/api/auth/register', { username: name, email, password });
        if (data.success) {
           toast.success("Đăng ký thành công! Hãy đăng nhập.");
           setState('Login');
        } else {
           toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Icons
  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A7.5 7.5 0 014.501 20.118z" />
    </svg>
  );

  const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );

  const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );

  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );

  return (
    <div className='min-h-screen relative flex items-center justify-center p-4'>
      {/* Background with Overlay */}
      <div 
        className='absolute inset-0 z-0'
        style={{
            backgroundImage: `url(${assets.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px) brightness(0.6)'
        }}
      />

      {/* Main Card */}
      <div className='relative z-10 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl flex max-w-5xl w-full text-slate-800 overflow-hidden min-h-[600px] max-h-[90vh] animate-fadeIn'>
        
        {/* Left Side: Welcome/Branding (Desktop Only) */}
        <div className='hidden lg:flex w-1/2 bg-gradient-to-br from-slate-800 to-gray-900 text-white flex-col justify-center items-center p-12 relative'>
             <div className='absolute top-0 left-0 w-full h-full opacity-10 bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]'></div>
             
             <div className='relative z-10 text-center'>
                 <img src={assets.logo} alt="Logo" className='h-14 invert mb-8 mx-auto drop-shadow-lg' />
                 <h2 className='text-3xl font-playfair font-bold mb-4 tracking-wide'>Chào mừng trở lại!</h2>
                 <p className='text-gray-300 text-lg mb-8 font-light leading-relaxed'>
                    {state === 'Login' 
                        ? "Đăng nhập để tiếp tục hành trình nghỉ dưỡng tuyệt vời cùng QuickStay." 
                        : "Tạo tài khoản ngay để nhận ưu đãi độc quyền và trải nghiệm dịch vụ đẳng cấp."}
                 </p>
                 
                 <div className='flex gap-2 justify-center mt-8'>
                     {[1,2,3].map(i => (
                         <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === 1 ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}></div>
                     ))}
                 </div>
             </div>
        </div>

        {/* Right Side: Form */}
        <div className='flex-1 bg-white overflow-y-auto'>
            <div className='flex flex-col justify-center min-h-full p-8 md:p-12 lg:p-16'>
            <div className='flex justify-between items-center mb-10'>
                <h3 className='text-3xl font-bold text-gray-800 font-playfair'>
                    {state === 'Login' ? 'Đăng nhập' : 'Tạo tài khoản'}
                </h3>
                <img src={assets.logo} alt="Logo" className='h-8 lg:hidden' />
            </div>

            <form onSubmit={onSubmitHandler} className='flex flex-col gap-6'> 
            {state === 'Sign Up' && (
                <div className='group'>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1'>Họ và tên</label>
                    <div className='relative'>
                        <input 
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                        className='w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all' 
                        type="text" 
                        placeholder='Nhập họ và tên' 
                        required 
                        />
                        <div className='absolute left-3 top-3.5 text-gray-400 group-focus-within:text-slate-600 transition-all'>
                            <UserIcon />
                        </div>
                    </div>
                </div>
            )}
            
            <div className='group'>
                <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1'>Email</label>
                <div className='relative'>
                    <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    className='w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all' 
                    type="email" 
                    placeholder='name@example.com' 
                    required 
                    />
                     <div className='absolute left-3 top-3.5 text-gray-400 group-focus-within:text-slate-600 transition-all'>
                        <MailIcon />
                    </div>
                </div>
            </div>

            <div className='group'>
                <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1'>Mật khẩu</label>
                <div className='relative'>
                    <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    className='w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all' 
                    type={showPassword ? "text" : "password"} 
                    placeholder='••••••••' 
                    required 
                    />
                    <div className='absolute left-3 top-3.5 text-gray-400 group-focus-within:text-slate-600 transition-all'>
                        <LockIcon />
                    </div>
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-3.5 text-gray-400 hover:text-slate-600 cursor-pointer focus:outline-none'
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
            </div>
            
            {state === 'Login' && (
                <div className='flex justify-between items-center mt-1'>
                    <label className='flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700'>
                        <input type="checkbox" className='rounded border-gray-300 text-slate-700 focus:ring-slate-500' />
                        Ghi nhớ
                    </label>
                    <button type="button" className='text-sm text-slate-600 hover:text-slate-900 font-semibold underline-offset-2 hover:underline'>
                        Quên mật khẩu?
                    </button>
                </div>
            )}

            <button disabled={isLoading} className='w-full bg-slate-800 hover:bg-slate-900 text-white py-3.5 rounded-lg font-bold text-lg shadow-lg shadow-slate-300 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2 uppercase tracking-wide'>
                {isLoading ? (
                    <div className='flex items-center justify-center gap-2'>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        <span>Đang xử lý...</span>
                    </div>
                ) : (state === 'Login' ? 'Đăng Nhập' : 'Tạo Tài Khoản')}
            </button>
            </form>

            <div className='mt-8 text-center'>
                 <div className='flex items-center gap-4 mb-6'>
                     <div className='h-px bg-gray-200 flex-1'></div>
                     <span className='text-xs text-gray-400 font-bold uppercase tracking-wider'>Hoặc</span>
                     <div className='h-px bg-gray-200 flex-1'></div>
                 </div>
                 
                 <div className='flex justify-center gap-4 mb-8'>
                     <button className='flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all text-sm font-medium text-gray-700'>
                         <img src={assets.facebookIcon} alt="Facebook" className='w-5 h-5' />
                         <span>Facebook</span>
                     </button>
                     <button className='flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all text-sm font-medium text-gray-700'>
                         <img src={assets.instagramIcon} alt="Google" className='w-5 h-5' />
                         <span>Google</span>
                     </button>
                 </div>

             {state === 'Login' ? (
                 <p className='text-gray-600'>
                 Chưa có tài khoản?{' '}
                 <button 
                     onClick={() => setState('Sign Up')} 
                     className='text-slate-800 font-bold hover:underline ml-1'
                 >
                     Đăng ký miễn phí
                 </button>
                 </p>
             ) : (
                 <p className='text-gray-600'>
                 Đã có tài khoản?{' '}
                 <button 
                     onClick={() => setState('Login')} 
                     className='text-slate-800 font-bold hover:underline ml-1'
                 >
                     Đăng nhập
                 </button>
                 </p>
             )}
             </div>
        </div>
        </div>
    </div>
    </div>
  );
};


export default Login;
