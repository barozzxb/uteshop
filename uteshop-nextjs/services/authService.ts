import axiosClient from "../utils/axiosClient";

export interface ApiResponse<T> {
  message: string;
  data?: T;
}

export const forgotPassword = async (email: string) => {
  return axiosClient.post<ApiResponse<null>>("/forgot-password", { email });
};

export const updateProfile = async (data: {
  email: string;
  name?: string;
  phone?: string;
}) => {
  return axiosClient.put<
    ApiResponse<{ email: string; name?: string; phone?: string }>
  >("/update-profile", data);
};

//auth services
export const register = async (email: string, firstname: string, lastname: string, password: string) => {
    const res = await axiosClient.post("/auth/register", {
        email, firstname, lastname, password
    });
    const status = res.status;
    if (status === 201) {
        localStorage.setItem("email", email);
        return { success: true, data: res.data };
    }
    else {
        return { success: false, data: res.data };
    }
}

export const activeAccount = async (email: String) => {
    const res = await axiosClient.post('/account/activate', { email })
    if (res.status === 200) {
        return { success: true, data: res.data };
    }
    return { success: false, data: res.data };
}

export const login = async (email: string, password: string) => {
    try {
        const res = await axiosClient.post("/login", {
            email,
            password,
        });

            localStorage.setItem('user', JSON.stringify(res.data.data.user));
            localStorage.setItem('token', res.data.data.token);
            return { success: true, data: res.data.data };
    } catch (error: any) {
        console.log(error);
        const message = error.response.data.message;
        return { success: false, data: {message}};
    };
}



export const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("userUpdated"));
    return "Đăng xuất thành công";
};

import axios from "axios";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1/auth";
export const requestForgotPassword = async (email: string) => {
  // Gọi endpoint backend
  return axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = async (token: string, password: string) => {
  return axios.put(`${API_URL}/reset-password/${token}`, { password });
};
