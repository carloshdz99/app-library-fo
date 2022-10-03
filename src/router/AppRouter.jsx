import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthRouter } from '../auth/routes/AuthRouter';
import { BookRouter } from "../modules/Books/routes/BookRouter";
import { DashBoardRouter } from "../modules/DashBoard/routes/DashBoardRoute";
import { useDispatch } from 'react-redux';
import { refresh } from "../services/authService";
import { loginAction, logout } from "../store/auth";

export const AppRouter = () => {
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    React.useEffect(() => {
        if (refreshToken) {
            refresh(refreshToken).then(result => {
                if (result) {
                    if (result.auth.token === null) {
                        dispatch(logout());
                    } else {
                        dispatch(loginAction({
                            token: result.auth.token,
                            refreshToken: result.auth.refreshToken,
                            firstname: result.auth.firstname,
                            lastname: result.auth.lastname,
                            email: result.auth.email,
                            rol: result.auth.rol,
                        }));
                    }
                }
            })
        }
    }, []);

    return (
        <Routes>
            {
                token ?
                    <>
                        <Route path="/*" element={<DashBoardRouter />} />
                        <Route path="/books/*" element={<BookRouter />} />
                    </>
                    : <Route path="/auth/*" element={<AuthRouter />} />
            }

            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
