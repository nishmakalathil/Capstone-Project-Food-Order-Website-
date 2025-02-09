import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstances"; // Custom axios instance

function UseFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(url);
                setData(response.data); // Set the response data directly
                setIsLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message); // Get error message
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return [data, isLoading, error];
}

export default UseFetch;
