import { createSlice } from '@reduxjs/toolkit';

// Retrieve user and token from localStorage if they exist
const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const storedToken = localStorage.getItem('token') || null;

// Define initial state with data from localStorage if available
const initialState = {
    user: storedUser,
    token: storedToken,
    isAuthenticated: !!storedToken,  // Set isAuthenticated based on whether a token exists
};

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.token = action.payload.jwttoken;
            state.isAuthenticated = true;
            
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
            localStorage.setItem('token', action.payload.jwttoken);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            // Remove from localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

// Export actions for use in components
export const { login, logout } = authSlice.actions;

// Export the reducer to be added to the store
export default authSlice.reducer;
