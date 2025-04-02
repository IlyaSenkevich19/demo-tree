import { useEffect, useState } from "react";

import { IApiResponse, ITreeNode, TRequestPayload } from "src/@types/types";

const useFetch = (callback: (payload: TRequestPayload) => Promise<IApiResponse>, payload: TRequestPayload) => {
    const [data, setData] = useState<ITreeNode[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const response = await callback(payload);
                if (response.success) {
                    setData(response.data);
                } else {
                    setError("Failed to fetch data");
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, error, isLoading };
};

export default useFetch;