import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstances"; 

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
                setData(response.data); 
                setIsLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return [data, isLoading, error];
}

export default UseFetch;
