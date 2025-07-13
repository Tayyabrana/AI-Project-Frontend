import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'https://technomentor.net/pm_api',
    // baseURL: 'http://localhost:5070/pm_api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('project-management-jwt-auth-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // if (window.location.pathname !== '/login') {
            //     Cookies.remove('helperzz-jwt-auth-token');
            //     window.location.href = '/login';
            // }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
