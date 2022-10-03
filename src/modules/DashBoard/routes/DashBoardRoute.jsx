import { Routes, Route, Navigate } from 'react-router-dom';
import { DashBoardPage } from '../pages/';

export const DashBoardRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<DashBoardPage />} />
            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    );
}
