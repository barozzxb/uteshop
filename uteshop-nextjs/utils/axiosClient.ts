import axios from "axios";
import type { ApiResponse } from "@/types/types";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const apiError: ApiResponse = {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Unknown error",
    };

    return Promise.reject(apiError);
  }
);

export default axiosClient;
