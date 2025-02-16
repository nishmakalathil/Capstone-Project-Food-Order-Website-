import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds
});


export default axiosInstance;