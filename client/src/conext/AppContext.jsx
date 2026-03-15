import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, logout as reduxLogout, selectToken, selectUser, selectIsOwner } from "../redux/authSlice";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const isOwner = useSelector(selectIsOwner);

    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);

    const getToken = async () => token;

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            dispatch(fetchUserProfile());
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token, dispatch]);

    const logout = () => {
        dispatch(reduxLogout());
        navigate('/login');
        toast.success("Đăng xuất thành công");
    }

    const value = {
        currency,
        navigate,
        user,
        // setUser,  // Controlled by Redux now
        getToken,
        isOwner,
        // setIsOwner, // Controlled by Redux now
        showHotelReg,
        axios,
        setShowHotelReg,
        searchedCities,
        setSearchedCities,
        toast,
        logout,
        token
    }
    return (
        <AppContext.Provider value={value}>
            <Toaster />
            {children}
        </AppContext.Provider>
    )
    
}
export const useAppContext = () => useContext(AppContext);