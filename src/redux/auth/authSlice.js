import { createSlice } from '@reduxjs/toolkit';
import {
    register,
    logIn,
    logOut,
    refreshUser
} from './authOperations';




const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        //! register
        [register.pending](state, { payload }) {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
            state.isRefreshing = false;
            state.error = null;
        },
        [register.fulfilled](state, { payload }) {
            state.user = payload.user;
            state.token = payload.token;
            state.isLoggedIn = true;
            state.error = null;
        },
        [register.rejected](state, { payload }) {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
            state.isRefreshing = false;
            state.error = payload;
        },

        //! logIn
        [logIn.pending](state, { payload }) {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
            state.isRefreshing = false;
            state.error = null;
        },
        [logIn.fulfilled](state, { payload }) {
            state.user = payload.user;
            state.token = payload.token;
            state.isLoggedIn = true;
            state.error = null;
        },
        [logIn.rejected](state, { payload }) {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
            state.isRefreshing = false;
            state.error = payload;
        },

        //! logOut
        [logOut.pending](state) {
            state.isLoggedIn = true;
            state.error = null;
        },
        [logOut.fulfilled](state) {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
            state.error = null;
        },
        [logOut.rejected](state, { payload }) {
            state.isLoggedIn = true;
            state.error = payload;
        },

        //! refreshUser
        [refreshUser.pending](state) {
            state.isRefreshing = true;
            state.error = null;
        },
        [refreshUser.fulfilled](state, { payload }) {
            state.user = payload;
            state.isLoggedIn = true;
            state.isRefreshing = false;
            state.error = null;
        },
        [refreshUser.rejected](state, { payload }) {
            state.isRefreshing = false;
            state.error = payload;
        },
    },
});

export const authReducer = authSlice.reducer;
