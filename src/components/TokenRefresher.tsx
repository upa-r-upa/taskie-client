import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi, client } from "@/api/client";
import { ErrorResponse } from "@/api/generated";
import { useAuthStore } from "@/state/useAuthStore";
import Routes from "@/constants/routes";
import { useMessageStore } from "@/state/useMessageStore";
import { useMutation } from "@tanstack/react-query";

interface InternalAxiosRequestConfigWithRetry
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export default function TokenRefresher() {
  const navigate = useNavigate();

  const {
    token,
    setIsAccessTokenRefreshing,
    setTokenWithUser,
    clearAuthState,
  } = useAuthStore((state) => state);
  const addMessage = useMessageStore(({ addMessage }) => addMessage);

  const refreshTokenMutation = useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: () => authApi.refreshToken(),
  });

  useEffect(() => {
    refreshTokenMutation
      .mutateAsync()
      .then((response) =>
        setTokenWithUser(response.data!.access_token, response.data!.user)
      )
      .catch(() => {
        clearAuthState();
      })
      .finally(() => {
        setIsAccessTokenRefreshing(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authorizationToken = (token: string) => `Bearer ${token}`;

  useEffect(() => {
    const requestInterceptor = client.interceptors.request.use(
      (request) => {
        if (token) {
          request.headers.Authorization = authorizationToken(token);
        }
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      client.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  useEffect(() => {
    const accessTokenRefresh = async (
      originalRequest: InternalAxiosRequestConfigWithRetry
    ) => {
      setIsAccessTokenRefreshing(true);

      originalRequest._retry = true;

      try {
        const response = await refreshTokenMutation.mutateAsync();

        setTokenWithUser(response.data!.access_token, response.data!.user);
        client.defaults.headers.common["Authorization"] = authorizationToken(
          token!
        );

        return client(originalRequest);
      } catch (error) {
        navigate(Routes.LOGIN);
        addMessage({
          message: "토큰이 만료되어 로그아웃 되었습니다. 다시 로그인해주세요.",
          type: "warning",
        });

        clearAuthState();

        return Promise.reject(error);
      } finally {
        setIsAccessTokenRefreshing(false);
      }
    };

    const responseInterceptor = client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError<ErrorResponse>) => {
        const originalRequest: InternalAxiosRequestConfigWithRetry | undefined =
          error.config;

        const isExpiredToken =
          error.response?.status === 401 &&
          error.response?.data.error_type === "EXPIRED_TOKEN";
        const isAuthAPIResponse = originalRequest?.url?.includes("auth");

        if (
          originalRequest &&
          isExpiredToken &&
          !originalRequest._retry &&
          !isAuthAPIResponse
        ) {
          await accessTokenRefresh(originalRequest);
        } else if (error.response?.status === 403) {
          navigate(Routes.LOGIN, { replace: true });
          addMessage({
            message: "현재 요청한 작업을 처리 할 권한이 없습니다.",
            type: "warning",
          });
        } else if (error.response?.status === 500) {
          addMessage({
            message: "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            type: "error",
          });
        } else if (error.code === "ERR_NETWORK") {
          addMessage({
            message:
              "현재 서버가 원활하지 않습니다. 잠시 후 다시 시도해주세요.",
            type: "error",
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      client.interceptors.response.eject(responseInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <></>;
}
