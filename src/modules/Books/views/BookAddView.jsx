import React from 'react'
import { Button, FormControl, Grid, InputLabel, NativeSelect, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { genreList } from '../../../store/genres';
import { genreListService, bookPostService } from '../../../services/';

import { useForm } from '../../../hook/useForm';

import { closeModal } from '../../../store/modal';
import { loading } from '../../../store/books';

export const BookAddView = () => {
    const dispatch = useDispatch();

    const { title, author, publish_year, genre, stock, onInputChange, onResetForm } = useForm({
        title: '',
        author: '',
        publish_year: '1970-01-01',
        genre: 1,
        stock: 0,
    });

    const { rows, isLoading } = useSelector(state => state.genre);

    React.useEffect(() => {
        if (isLoading) {
            genreListService().then(result => {
                if (result) {
                    dispatch(genreList({ genres: result.genres }));
                }
            });
        }
    }, [isLoading])

    const handleSubmit = async (e) => {
        e.preventDefault();

        await bookPostService({ title, author, publish_year, genre, stock, });
        onResetForm();

        dispatch(loading());
        dispatch(closeModal());
    }

    return (
        <Grid
            container
            spacing={0}
            sx={{ minHeight: "100%" }}
        >
            <form onChange={onInputChange} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Titulo"
                            type="text"
                            placeholder="titulo..."
                            value={title}
                            fullWidth
                            name="title"
                            variant="filled"
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Autor"
                            type="text"
                            placeholder="nombre del autor..."
                            value={author}
                            fullWidth
                            name="author"
                            variant="filled"
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Fecha de publicacion"
                            type="date"
                            fullWidth
                            value={publish_year}
                            name="publish_year"
                            variant="filled"
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Genero
                        </InputLabel>
                        <FormControl fullWidth>
                            <NativeSelect
                                defaultValue={genre}
                                inputProps={{
                                    name: 'genre',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                {
                                    rows.map((i) => (
                                        <option key={i.id} value={i.id}>{i.name}</option>
                                    ))
                                }
                            </NativeSelect>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Stock"
                            type="number"
                            fullWidth
                            value={stock}
                            name="stock"
                            variant="filled"
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={6} sx={{ marginTop: 2 }}>
                        <Button type='submit' fullWidth variant="contained">Guardar</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}
