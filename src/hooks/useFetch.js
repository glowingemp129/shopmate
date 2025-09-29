import {useEffect, useState} from "react";

 export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url , {signal: controller.signal});
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setLoading(false);
                setData(data);
                setError("");
            } catch (err) {
                console.log(err.message);
                setLoading(false);
                setError(err.message);
            }
        }
        fetchData();

        return () => controller.abort();
    }, [url]);

    return {data, loading, error};
}