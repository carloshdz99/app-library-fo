import React from 'react'
import { FormControl, Grid, IconButton, InputLabel, NativeSelect, Typography } from '@mui/material';
import { DataTableComponent } from '../../components/';
import { bookList } from '../../../store/books/';
import { useDispatch, useSelector } from 'react-redux';
import { bookBinnacleService, bookRequestService } from '../../../services/';
import { CheckCircle } from '@mui/icons-material';
import { loading } from '../../../store/books';
import { openAlert } from '../../../store/alerts';
import { AlertSucces } from '../../../utils/Alertas';

export const BookBinnacle = ({ title = '' }) => {
    const dispatch = useDispatch();

    const [returned, setReturnet] = React.useState(false);

    const handleCheckReturned = async (row) => {
        const { request } = await bookRequestService({
            id_book: row.book.id,
            id_state: 2,
            id_user: row.user.id,
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

    const Acciones = (row) => {
        return (
            <>
                {
                    row.returned ?
                        <></>
                        : <IconButton color="primary" component="label" onClick={() => handleCheckReturned(row)}>
                            <CheckCircle />
                        </IconButton>
                }

            </>
        )
    }

    const head = [
        {
            name: 'Titulo',
            selector: row => row.book?.title,
        },
        {
            name: 'Autor',
            selector: row => row.book?.author,
        },
        {
            name: 'Genero',
            selector: row => row.book?.genrer?.name,
        },
        {
            name: 'Usuario',
            selector: row => row.user?.email,
        },
        {
            name: 'Acciones',
            cell: row => <Acciones {...row} />
        }
    ]

    const { isLoading, rows } = useSelector(state => state.books);

    React.useEffect(() => {
        if (isLoading || returned) {
            bookBinnacleService(returned).then(result => {
                if (result) {
                    dispatch(bookList({ books: result.books }));
                }
            })
        }
    }, [isLoading, returned])

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
                    <Grid item
                        sx={{ width: '30%' }}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Estado de libro
                        </InputLabel>
                        <FormControl fullWidth>
                            <NativeSelect
                                defaultValue={returned}
                                onChange={(e) => {
                                    setReturnet(e.target.value)
                                    dispatch(loading());
                                }}
                                inputProps={{
                                    name: 'returned',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option key={"true"} value={true}>Retornados</option>
                                <option key={"false"} value={false}>Solicitados</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                </Grid>

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
            <AlertSucces />
        </Grid>
    )
}

