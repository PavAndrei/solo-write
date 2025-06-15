import { useState, useCallback } from "react";

export const useFetch = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (params) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchFunction(params);
        setData(result);
        return result;
      } catch (err) {
        setError(err as Error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchFunction]
  );

  return { data, isLoading, error, execute };
};
