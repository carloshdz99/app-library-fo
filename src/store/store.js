import { configureStore } from '@reduxjs/toolkit';
import { booksSlice } from './books/';
import { genreSlice } from './genres';
import { menuSlice } from './menu';
import { modalSlice } from './modal';
import { authSlice } from './auth';
import { alertSlice } from './alerts';

// configuracion de estado globar en redux
export const store = configureStore({
    reducer: {
        menu: menuSlice.reducer,
        books: booksSlice.reducer,
        modal: modalSlice.reducer,
        genre: genreSlice.reducer,
        auth: authSlice.reducer,
        alertas: alertSlice.reducer,
    },
});
