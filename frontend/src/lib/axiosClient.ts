import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_API || "http://127.0.0.1:8000/api/v1",
    timeout: parseInt(import.meta.env.VITE_AXIOS_TIMEOUT_MS || "8000"),
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message ?? error.message ?? 'System error';
        return Promise.reject(new Error(message));
    }
);

export {
    axiosClient
};
