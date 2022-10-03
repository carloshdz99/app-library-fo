import { httpClient } from "./httpclient";

export const genreListService = async () => {
    try {
        const genres = await httpClient('/genre');

        return {
            status: true,
            genres: genres.data,
        }
    } catch (error) {
        return {
            status: false,
        }
    }
}
