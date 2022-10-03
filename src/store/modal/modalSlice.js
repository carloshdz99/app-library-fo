import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        open: false,
        title: '',
        modalContent: null,
    },
    reducers: {
        openModal: (state, { payload }) => {
            state.open = true;
            state.title = payload.title;
        },
        closeModal: (state) => {
            state.open = false;
            state.title = '';
        },
        modalContentChild: (state, { payload }) => {
            state.modalContent = payload.modalContent;
        },
    },
});

export const { openModal, closeModal, modalContentChild } = modalSlice.actions;
