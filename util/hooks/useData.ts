import { useEffect, useState } from "react";
import axios from "axios";

export const useData = <T>(url: string, initialData?: T) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | undefined>(initialData);
    const [error, setError] = useState<any | undefined>(undefined);

    useEffect(() => {
        if (!data) {
            fetch();
        }
    }, []);

    const fetch = () => {
        setIsLoading(true);
        return axios
            .post<T>(url, {})
            .then(({ data }) => {
                setData(data);
            })
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false));
    };

    return { data, isLoading, error, refetch: fetch };
};
