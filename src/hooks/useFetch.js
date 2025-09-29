import {useEffect, useRef, useState} from "react";

 export const useFetch = (url, _body) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const body = useRef(_body);

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
    }, [url, body]);

    return {data, loading, error};
}