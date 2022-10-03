import { createSlice } from '@reduxjs/toolkit';

export const genreSlice = createSlice({
    name: 'genre',
    initialState: {
        rows: [],
        isLoading: true,
    },
    reducers: {
        genreList: (state, { payload }) => {
            state.rows = payload.genres;
            state.isLoading = false;
        },
        noDataGenre: (state) => {
            state.rows = [];
            state.isLoading = false;
        },
    },
});

export const { genreList, noDataGenre } = genreSlice.actions;
