import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        refreshToken: null,
        firstname: null,
        lastname: null,
        email: null,
        rol: null,
    },
    reducers: {
        loginAction: (state, { payload }) => {
            state.token = payload.token;
            state.refreshToken = payload.refreshToken;
            state.firstname = payload.firstname;
            state.lastname = payload.lastname;
            state.email = payload.email;
            state.rol = payload.rol;
        },
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.firstname = null;
            state.lastname = null;
            state.email = null;
            state.rol = null;
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");   
        }
    },
});

export const { loginAction, logout } = authSlice.actions;
