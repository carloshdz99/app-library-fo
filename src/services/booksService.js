import { httpClient } from "./httpclient";

export const bookListService = async (title, genre, author) => {

    try {
        const filtros = {};
        if (title) filtros.title = title;;
        if (genre) filtros.genre = genre;
        if (author) filtros.author = author;
        const books = await httpClient('/books', {}, 'get', {}, filtros);

        return {
            status: true,
            books: books.data,
        }
    } catch (error) {
        return {
            status: false,
        }
    }
}

export const bookPostService = async (body) => {
    try {
        await httpClient('/books', body, 'post');
    } catch (error) {
        return {
            status: false,
        }
    }
}

export const bookRequestService = async (body) => {
    try {
        const request = await httpClient('/books/request', body, 'post');

        return {
            status: true,
            request,
        }
    } catch (error) {
        return {
            status: false,
        }
    }
}

export const bookBinnacleService = async (returned = true) => {
    try {
        const books = await httpClient('/binnacle', {}, 'get', {}, { returned });

        return {
            status: true,
            books: books.data,
        }
    } catch (error) {
        return {
            status: false,
        }
    }
}
