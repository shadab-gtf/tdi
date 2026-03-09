import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { BASE_ADMIN } from "../../../config";
import { store } from "@/redux/store";
import { logout, updateAccessToken } from "@/features/slices/authSlice";

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface FailedQueueItem {
  resolve: () => void;
  reject: (error: unknown) => void;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_ADMIN,
  withCredentials: true,
});

let isRefreshing = false;
let isLoggingIn = false;
let failedQueue: FailedQueueItem[] = [];

export const setIsLoggingIn = (value: boolean) => {
  isLoggingIn = value;
};

const processQueue = (error: unknown | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.user?.accessToken;
    const refreshToken = localStorage.getItem("refreshToken");

    config.headers = config.headers || {};

    // ✅ If refresh API → send refreshToken in header
    if (config.url?.includes("/auth/refresh")) {
      if (refreshToken) {
        config.headers.Authorization = `Bearer ${refreshToken}`;
      }
    }

    // ✅ All other APIs → send accessToken
    else {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;
    const status = error.response?.status;

    if (isLoggingIn) {
      return Promise.reject(error);
    }

    if (isLoggingIn) {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          store.dispatch(logout());
          return Promise.reject(error);
        }
        const res = await apiClient.post("/auth/refresh");

        const newAccessToken = res.data.data.newAccessToken;

        store.dispatch(updateAccessToken(newAccessToken));
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        store.dispatch(logout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
