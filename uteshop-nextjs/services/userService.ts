// const API_BASE_URL = "http://localhost:9000/api/v1";

// export const getUserInfo = async (email: string) => {
//   try {
//     const res = await fetch(`${API_BASE_URL}/user/profile?email=${email}`);
//     if (!res.ok) return null;
//     const data = await res.json();
//     return data;
//   } catch {
//     return null;
//   }
// };

// export const updateUserInfo = async (user: any) => {
//   try {
//     const res = await fetch(`${API_BASE_URL}/user/update-info?email=${user.email}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     });
//     if (!res.ok) return { success: false };
//     const data = await res.json();
//     if (data.success) {
//       localStorage.setItem("user", JSON.stringify(user));
//       window.dispatchEvent(new Event("userUpdated"));
//     }
//     return data;
//   } catch (error) {
//     console.error(error);
//     return { success: false };
//   }
// };

import axiosClient from "../utils/axiosClient";
import { ApiResponse } from "../types/types";

export interface UserProfile {
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  address?: string;
  gender?: string;
  dob?: string;
}

/**
 * GET /account/me
 */
export const getProfile = async () => {
  const res = await axiosClient.get<ApiResponse<UserProfile>>(
    "/account/me"
  );
  return res.data;
};

/**
 * PUT /account/me
 */
export const updateProfile = async (
  payload: Partial<Omit<UserProfile, "email" | "role">>
) => {
  const res = await axiosClient.put<ApiResponse<UserProfile>>(
    "/account/me",
    payload
  );
  return res.data;
};
