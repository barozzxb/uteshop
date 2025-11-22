import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1/auth";

export const requestForgotPassword = async (email) => {
  return axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = async (token, password) => {
  return axios.put(`${API_URL}/reset-password/${token}`, { password });
};

export const login = async (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const updateProfile = async (formData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Không tìm thấy token! Vui lòng đăng nhập lại.");
  }

  return axios.put(`${API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
