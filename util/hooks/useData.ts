import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const useData = <T>(url: string, initialData?: T) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | undefined>(undefined);
    const [error, setError] = useState<any | undefined>(undefined);
    const firstLoading = useRef<boolean>(true);

    useEffect(() => {
        if (initialData) {
            setData(initialData);
        } else {
            fetch();
        }
    }, []);

    const fetch = (u?: string) => {
        if (isLoading) return;
        setIsLoading(true);
        setData(undefined);
        axios
            .get<T>(u || url)
            .then(({ data }) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    };

    const clear = () => setData(undefined);

    return { data, isLoading, error, refetch: fetch, clear };
};
