import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hook/useForm';
import { login } from '../../services/authService';
import { loginAction } from '../../store/auth';
import { useDispatch } from 'react-redux';

export const LoginPage = () => {
    const dispatch = useDispatch();

    const { email, password, onInputChange, onResetForm } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const auth = await login(email, password);

        dispatch(loginAction({
            token: auth.auth.token,
            refreshToken: auth.auth.refreshToken,
            firstname: auth.auth.firstname,
            lastname: auth.auth.lastname,
            email: auth.auth.email,
            rol: auth.auth.rol,
        }));

        localStorage.setItem('token', auth.auth.token)
        localStorage.setItem('refreshToken', auth.auth.refreshToken)

        onResetForm();

        window.location.href = '/';
    }

    return (
        <AuthLayout title='Login'>
            <form onSubmit={handleSubmit} onChange={onInputChange}>
                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            variant="filled"
                            value={email}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            name="password"
                            variant="filled"
                            value={password}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <Button type='submit' fullWidth variant="contained">Iniciar Sesion</Button>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
