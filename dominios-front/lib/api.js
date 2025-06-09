import axios from 'axios';

const isServer = typeof window === 'undefined';
const baseURL = isServer
    ? 'http://dominios-back:8000/api'
    : 'http://localhost:8000/api';

const api = axios.create({
    baseURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

if (!isServer) {
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
}

export default api;
