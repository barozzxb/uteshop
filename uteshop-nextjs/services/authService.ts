//auth services
import axios from "../utils/axiosClient";

export interface ApiResponse<T> {
  message: string;
  data?: T;
}

export const forgotPassword = async (email: string) => {
  return axios.post<ApiResponse<null>>("/forgot-password", { email });
};

export const updateProfile = async (data: {
  email: string;
  name?: string;
  phone?: string;
}) => {
  return axios.put<
    ApiResponse<{ email: string; name?: string; phone?: string }>
  >("/update-profile", data);
};
