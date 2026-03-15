import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for Logging In
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/auth/login', { email, password });
            if (data.success) {
                localStorage.setItem('token', data.token);
                return { user: data.user, token: data.token };
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Async Thunk for Fetching User Profile
export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            if (!token) return rejectWithValue('No token found');

            const { data } = await axios.get('${import.meta.env.VITE_API_URL}/api/users', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                return data.user;
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isOwner: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isOwner = false;
            state.error = null;
            localStorage.removeItem('token');
            // Clear axios header if possible, or handle in component
        },
        setToken: (state, action) => {
            state.token = action.payload;
            if (action.payload) localStorage.setItem('token', action.payload);
            else localStorage.removeItem('token');
        },
        // Manually update user (e.g. after editing profile or upgrading to owner)
        setUser: (state, action) => {
            state.user = action.payload;
            if (action.payload) {
                state.isOwner = action.payload.role === 'hotelOwner' || action.payload.role === 'admin';
            }
        }
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isOwner = action.payload.user.role === 'hotelOwner' || action.payload.user.role === 'admin';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Fetch Profile
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isOwner = action.payload.role === 'hotelOwner' || action.payload.role === 'admin';
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                // If fetch fails (e.g. 401), might want to logout
                if (action.payload === 'jwt expired' || action.payload === 'Not authorized') {
                    state.user = null;
                    state.token = null;
                    state.isOwner = false;
                    localStorage.removeItem('token');
                }
            });
    },
});

export const { logout, setToken, setUser } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsOwner = (state) => state.auth.isOwner;
export const selectToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
