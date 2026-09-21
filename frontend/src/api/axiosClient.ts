import axios from 'axios';

// TODO: Replace the placeholder and move to .env
const BACKEND_URL = 'https://example.com'
const AXIOS_TIMEOUT_MS = 10000

const axiosClient = axios.create({
    baseURL: BACKEND_URL,
    timeout: AXIOS_TIMEOUT_MS,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auto assign Token to Header before call API
// TODO: Local storage should have key 'access_token'or replace it
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.message || 'System error';
        return Promise.reject(new Error(message));
    }
);

export default axiosClient;
