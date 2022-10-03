import axios from "axios";

const token = localStorage.getItem('token');

const instance = axios.create({
    // baseURL: 'http://localhost:8001/api/v1',
    baseURL: 'http://api-library-fo.herokuapp.com/api/v1'
});

export const httpClient = async (url, data = {}, method = 'get', headers = {}, params = {}) => instance({
    method,
    url,
    data,
    headers: {
        ...headers,
        authorization: `Bearer ${token}`
    },
    params,
}).catch(err => {
    console.log(err);
});
