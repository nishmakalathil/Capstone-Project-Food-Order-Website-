import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`, // Use environment variable for API base URL
    withCredentials: true,  // Ensure cookies are sent with requests (if needed)
    headers: {
        "Content-Type": "application/json",  // Default header for JSON requests
    },
});

// Add request interceptor to include token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage or sessionStorage (if available)
        const token = localStorage.getItem("token");  // or sessionStorage.getItem("token")

        // If token exists, add Authorization header to the request
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;  // Proceed with the request
    },
    (error) => {
        return Promise.reject(error);  // Reject the request in case of an error
    }
);

export default axiosInstance;
