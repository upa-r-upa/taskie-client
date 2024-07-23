import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

import { ErrorResponse } from "../api/generated";

interface useMutationProps<T> {
  mutationFn: () => Promise<AxiosResponse<T>>;

  onError?: (error: AxiosError<ErrorResponse>) => void;
  onSuccess?: (data: AxiosResponse<T>) => void;
}

export default function useMutation<T>({
  mutationFn,
  onError,
  onSuccess,
}: useMutationProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError<ErrorResponse> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mutation = () => {
    if (isLoading) return;

    setIsLoading(true);

    mutationFn()
      .then((data: AxiosResponse) => {
        setData(data.data?.data || null);
        setError(null);
        onSuccess?.(data);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setData(null);
        setError(error);
        onError?.(error);
      })
      .finally(() => setIsLoading(false));
  };

  return { data, isError: !!error, error, isLoading, mutation };
}
