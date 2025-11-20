import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1/auth";

export const requestForgotPassword = async (email) => {
  // Gọi endpoint backend
  return axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = async (token, password) => {
  return axios.put(`${API_URL}/reset-password/${token}`, { password });
};
