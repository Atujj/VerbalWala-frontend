import axios from "axios";
import { API } from "@/constants/api";
import { STORAGE } from "@/constants/storage";

const axiosInstance = axios.create({
    baseURL: API.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE.TOKEN);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            localStorage.removeItem(STORAGE.TOKEN);
            localStorage.removeItem(STORAGE.USER);

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;