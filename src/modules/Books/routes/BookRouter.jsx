import { Routes, Route, Navigate } from 'react-router-dom';
import { BookListPage, BookBinnaclePage } from '../pages/';

export const BookRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<BookListPage />} />
            <Route path='/binnacle' element={<BookBinnaclePage />} />
            <Route path='/*' element={<Navigate to='/books/' />} />
        </Routes>
    );
}
