import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically attach the Authorization header if a token is stored
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Or use cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default axiosInstance;