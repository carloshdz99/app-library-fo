import React from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { bookRequestService } from '../../../services';
import { loading } from '../../../store/books';
import { closeModal } from '../../../store/modal';
import { openAlert } from '../../../store/alerts';
import { AlertSucces } from '../../../utils/Alertas';

export const BookInfoView = () => {
    const dispatch = useDispatch();
    const { id, title, author, publish_year, genre, stock } = useSelector(state => state.books.bookInfo);
    const { rol } = useSelector(state => state.auth);

    const handleRequest = async (e) => {
        e.preventDefault();

        const { request } = await bookRequestService({
            id_book: id,
            id_state: 1,
        });

        if (request.request.status === 201) {
            dispatch(loading());
            dispatch(openAlert({ msg: 'Prueba de alerta', vertical: 'top', severity: 'success' }));
        }

        if (request.request.status === 409) {
            dispatch(loading());
            dispatch(openAlert({ msg: request.data.msg, vertical: 'top', severity: 'error' }));
        }
    }

    return (
        <Grid
            container
            spacing={0}
            sx={{ minHeight: "100%" }}
        >
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Titulo"
                            type="text"
                            placeholder="titulo..."
                            value={title}
                            fullWidth
                            name="title"
                            variant="outlined"
                            aria-readonly
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
                            variant="outlined"
                            aria-readonly
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Fecha de publicacion"
                            type="date"
                            fullWidth
                            value={publish_year.substring(0, 10)}
                            name="publish_year"
                            variant="outlined"
                            aria-readonly
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Genero"
                            type="text"
                            fullWidth
                            value={genre}
                            name="genre"
                            variant="outlined"
                            aria-readonly
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Stock"
                            type="number"
                            fullWidth
                            value={stock}
                            name="stock"
                            variant="outlined"
                            aria-readonly
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <Button type='submit' fullWidth variant="contained">Guardar</Button>
                    </Grid>
                </Grid>
                {
                    stock > 0 ?
                        <Grid container>
                            <Grid item xs={12} sx={{ marginTop: 2 }}>
                                {
                                    rol === 2 && <Button onClick={handleRequest} type='submit' fullWidth variant="contained">Solicitar</Button>
                                }
                            </Grid>
                        </Grid>
                        : <></>
                }
            </form>
            <AlertSucces />
        </Grid>
    )
}
