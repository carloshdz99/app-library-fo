import React from 'react'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DataTableComponent, ModalComponent } from '../../components/';
import { AddCircle, RemoveRedEye, Edit } from '@mui/icons-material';
import moment from 'moment';
import { bookList, showBook } from '../../../store/books/';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../store/modal';
import { bookListService } from '../../../services/';
import { BookAddView, BookInfoView } from './';
import { useForm } from '../../../hook/useForm';

export const BookListView = ({ title = '' }) => {
    const dispatch = useDispatch();

    const { titleBook, author, genre, onInputChange, onResetForm } = useForm({
        titleBook: '',
        author: '',
        genre: '',
    });

    const [modalContent, setModalContent] = React.useState(<></>);

    const handleOpen = () => {
        dispatch(openModal({ title: 'Nuevo Libro' }));
        setModalContent(<BookAddView />);
    }

    const handleShowBook = (row) => {
        dispatch(showBook({ row }));
        dispatch(openModal({ title: row.title }));
        setModalContent(<BookInfoView />)
    }

    const Acciones = (row) => {
        return (
            <>
                <IconButton onClick={() => handleShowBook(row)} color="primary" component="label">
                    <RemoveRedEye />
                </IconButton>
            </>
        )
    }

    const head = [
        {
            name: 'Titulo',
            selector: row => row.title,
        },
        {
            name: 'Autor',
            selector: row => row.author,
        },
        {
            name: 'Año de publicacion',
            selector: row => moment(row.publish_year).format('L'),
        },
        {
            name: 'Stock',
            selector: row => row.stock,
        },
        {
            name: 'Genero',
            selector: row => row.genrer.name,
        },
        {
            name: 'Acciones',
            cell: row => <Acciones {...row} />
        }
    ]

    const { isLoading, rows } = useSelector(state => state.books);
    const { rol } = useSelector(state => state.auth);

    React.useEffect(() => {
        if (isLoading || (titleBook || genre || author)) {
            bookListService(title = titleBook, genre, author).then(result => {
                if (result) {
                    dispatch(bookList({ books: result.books }));
                }
            })
        }
    }, [isLoading, titleBook, genre, author])

    return (
        <Grid
            container
            spacing={0}
            sx={{ width: "100%", minHeight: "100%" }}
            direction='row'
            alignItems='center'
        >

            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h4'>{title}</Typography>
                </Grid>
            </Grid>

            <Grid
                container
                spacing={0}
                direction='column'
                alignItems='center'
                sx={{ minHeight: 400 }}
            >
                <Grid
                    container
                    spacing={0}
                    direction='column'
                    alignItems='left'
                    sx={{ width: '85%', mb: 2 }}
                >
                    <Grid item>
                        {
                            rol === 1 && <Button onClick={handleOpen} variant="contained" startIcon={<AddCircle />}>Agregar</Button>
                        }
                    </Grid>
                </Grid>

                <form
                    onChange={onInputChange}>
                    <Grid container
                        spacing={0}
                        direction='row'
                        alignItems='center'
                        sx={{ width: '85%', mb: 2 }}>
                        <Grid item xs={3}
                            sx={{ ml: 1 }}>
                            <TextField
                                label="Titulo"
                                type="text"
                                placeholder="titulo..."
                                fullWidth
                                name="titleBook"
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={3}
                            sx={{ ml: 1 }}>
                            <TextField
                                label="Author"
                                type="text"
                                placeholder="nombre autor..."
                                fullWidth
                                name="author"
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={3}
                            sx={{ ml: 1 }}>
                            <TextField
                                label="Genero"
                                type="text"
                                placeholder="nombre genero..."
                                fullWidth
                                name="genre"
                                variant="filled"
                            />
                        </Grid>

                    </Grid>
                </form>

                <Grid
                    container
                    spacing={0}
                    direction='column'
                    alignItems='left'
                    sx={{ width: '85%', mb: 2 }}
                >
                    <Grid item>
                        <DataTableComponent
                            rows={rows}
                            columns={head}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <ModalComponent>
                {modalContent}
            </ModalComponent>
        </Grid>
    )
}

