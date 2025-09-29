import {useEffect, useState} from "react";

 export const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, [url]);

    return {data};
}