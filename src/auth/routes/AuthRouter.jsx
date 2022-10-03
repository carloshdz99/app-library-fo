import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages';

export const AuthRouter = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage />} /> {/** Pantalla de login */}
        <Route path='/*' element={<Navigate to='/auth/login' />} /> {/** Redireccion en enlaces desconocidos */}
    </Routes>
  )
}