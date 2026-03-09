"use client";

import { useState, useCallback } from "react";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import apiClient from "./apiClient";

export function useApi(base = "") {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const buildUrl = useCallback(
    (endpoint: string) =>
      endpoint.startsWith("/")
        ? `${base}${endpoint}`
        : `${base}/${endpoint}`,
    [base]
  );

  const get = useCallback(
    async <T = unknown>(
      endpoint: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.get<T>(
          buildUrl(endpoint),
          config
        );
        return res;
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "API error"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [buildUrl]
  );

  const post = useCallback(
    async <T = unknown>(
      endpoint: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.post<T>(
          buildUrl(endpoint),
          data,
          config
        );
        return res;
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "API error"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [buildUrl]
  );

  const put = useCallback(
    async <T = unknown>(
      endpoint: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.put<T>(
          buildUrl(endpoint),
          data,
          config
        );
        return res;
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "API error"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [buildUrl]
  );

  const patch = useCallback(
    async <T = unknown>(
      endpoint: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.patch<T>(
          buildUrl(endpoint),
          data,
          config
        );
        return res;
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "API error"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [buildUrl]
  );

  const del = useCallback(
    async <T = unknown>(
      endpoint: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.delete<T>(
          buildUrl(endpoint),
          config
        );
        return res;
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "API error"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [buildUrl]
  );

  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    del,
  };
}

export default useApi;
