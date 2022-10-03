import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        activo: false,
        anchor: 'left',
        drawerWidth: 0,
    },
    reducers: { // aqui se guardan los cambios de estado
        closeMenu: (state, { payload }) => {
            state.activo = false;
            state.drawerWidth = payload;
        },
        openMenu: (state, { payload }) => {
            state.activo = true;
            state.drawerWidth = payload;
        },
    },
});

export const { closeMenu, openMenu } = menuSlice.actions;
