import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const API_URL = 'https://fakestoreapi.com';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const customFetcher = <T>({
  url,
  method,
  params,
  data,
  headers,
  signal,
}: {
  url: string;
  method: string;
  params?: Record<string, string | number | boolean | null | undefined>;
  data?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}): Promise<T> => {
  const config: AxiosRequestConfig = {
    url,
    method,
    params,
    data,
    headers,
    signal,
  };
  return apiClient(config)
    .then((response) => response.data)
    .catch((error: unknown) => {
      if (axios.isCancel(error)) {
        throw error;
      }

      if (error instanceof AxiosError && error.code === 'ERR_CANCELED') {
        throw error;
      }

      console.error('API call failed:', error);
      throw error;
    });
};

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
    }
    return Promise.reject(error);
  }
);
