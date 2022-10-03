import { httpClient } from "./httpclient";

export const login = async (email, password) => {
    try {
        const auth = await httpClient('/auth/login', { email, password }, 'post');

        return {
            status: true,
            auth: auth.data,
        }
    } catch (e) {
        return {
            status: false,
        }
    }
}

export const refresh = async (refreshToken) => {
    try {
        const auth = await httpClient('/auth/refresh', { refreshToken }, 'post');

        return {
            status: true,
            auth: auth.data,
        }
    } catch (e) {
        return {
            status: false,
        }
    }
}
