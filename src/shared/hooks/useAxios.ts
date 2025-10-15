import axios, {AxiosRequestConfig, AxiosInstance} from "axios";
import {getAccessToken} from "@/shared/store/authStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://123.213.36.243:40080";

// accessToken이 있을 때 사용하는 axios instance
export const authInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

authInstance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

// accessToken 없이 사용하는 axios instance
export const useAxios: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

authInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // accessToken 만료로 401 발생 시
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // accessToken 재발급 요청
                const refreshRes = await useAxios.post("/api/v1/token/refresh");
                const newToken = refreshRes.data?.data;
                if (newToken) {
                    // accessToken 갱신
                    import("@/shared/store/authStore").then(({setAccessToken}) => {
                        setAccessToken(newToken);
                    });
                    // Authorization 헤더 갱신 후 원래 요청 재시도
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    return authInstance(originalRequest);
                }
            } catch (refreshError) {
                // refreshToken도 만료: 로그인 페이지로 이동
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const get = <T = any>(url: string, config?: AxiosRequestConfig) => useAxios.get<T>(url, config);
export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => useAxios.post<T>(url, data, config);
export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => useAxios.put<T>(url, data, config);
export const del = <T = any>(url: string, config?: AxiosRequestConfig) => useAxios.delete<T>(url, config);

export const authGet = <T = any>(url: string, config?: AxiosRequestConfig) => authInstance.get<T>(url, config);
export const authPost = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => authInstance.post<T>(url, data, config);
export const authPut = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => authInstance.put<T>(url, data, config);
export const authDel = <T = any>(url: string, config?: AxiosRequestConfig) => authInstance.delete<T>(url, config);
