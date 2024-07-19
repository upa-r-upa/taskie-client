import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { ErrorResponse } from "../api/generated";

interface Response<T> {
  data?: T;
  message?: string;
}

interface useQueryProps<T> {
  queryFn: () => Promise<AxiosResponse<Response<T>>>;

  enabled?: boolean;

  onError?: (error: AxiosError<ErrorResponse>) => void;
  onSuccess?: (data: AxiosResponse<Response<T>>) => void;
}

export default function useQuery<T>({
  queryFn,
  enabled = true,
  onError,
  onSuccess,
}: useQueryProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError<ErrorResponse> | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);

  const dataFetch = () => {
    setIsLoading(true);

    queryFn()
      .then((data: AxiosResponse<Response<T>>) => {
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

  useEffect(() => {
    if (enabled) {
      dataFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isError: !!error, error, isLoading, refetch: dataFetch };
}
