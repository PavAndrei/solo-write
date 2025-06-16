import { useState, useCallback } from "react";

interface IFetchData {
  success: boolean;
  message: string;
}

export const useFetch = (fetchFunction) => {
  const [data, setData] = useState<IFetchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (params) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchFunction(params);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchFunction]
  );

  return { data, isLoading, error, execute };
};
