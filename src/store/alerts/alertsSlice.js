import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
    name: 'alertas',
    initialState: {
        open: false,
        msg: '',
        vertical: 'top',
        severity: 'success',
    },
    reducers: {
        openAlert: (state, { payload }) => {
            state.open = true;
            state.msg = payload.msg;
            state.vertical = payload.vertical;
            state.severity = payload.severity;
        },
        closeAlert: (state) => {
            state.open = false;
            state.msg = '';
            state.vertical = 'top';
            state.severity = 'success';
        },
    },
});

export const { openAlert, closeAlert } = alertSlice.actions;
