import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        rows: [],
        isLoading: true,
        bookInfo: {
            id: '',
            title: '',
            author: '',
            publish_year: '',
            genre: 0,
            stock: 0,
        }
    },
    reducers: {
        bookList: (state, { payload }) => {
            state.rows = payload.books;
            state.isLoading = false;
        },
        noDataBook: (state) => {
            state.rows = [];
            state.isLoading = false;
        },
        loading: (state) => {
            state.isLoading = true;
        },
        showBook: (state, { payload }) => {
            state.bookInfo = {
                id: payload.row.id,
                title: payload.row.title,
                author: payload.row.author,
                publish_year: payload.row.publish_year,
                genre: payload.row.genrer.name,
                stock: payload.row.stock,
            }
        },
    },
});

export const { bookList, noDataBook, loading, showBook } = booksSlice.actions;
