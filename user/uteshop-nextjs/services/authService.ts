import axiosClient from "../utils/axiosClient";
import { ApiResponse } from "../types/types";

/**
 * POST /register
 */
export const register = async (
    email: string,
    firstname: string,
    lastname: string,
    password: string
) => {
    const res = await axiosClient.post<ApiResponse<null>>("/register", {
        email,
        firstname,
        lastname,
        password,
    });

    return res.data;
};

/**
 * POST /login
 */
interface LoginResponse {
    token: string;
    user: {
        email: string;
        role: string;
    };
}

export const login = async (
    email: string,
    password: string
): Promise<ApiResponse<LoginResponse>> => {
    try {
        const res = await axiosClient.post<ApiResponse<LoginResponse>>(
            "/login",
            { email, password }
        );

        if (res.data.success && res.data.data) {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.data.user));
        }

        return res.data;
    } catch (err: any) {
        return {
            success: false,
            message:
                err.response?.data?.message ||
                "Login failed",
        };
    }
};

/**
 * POST /account/activate
 */
export const activateAccount = async () => {
    const res = await axiosClient.post<ApiResponse<null>>(
        "/account/activate"
    );
    return res.data;
};

/**
 * Logout (FE only)
 */
export const logout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("userUpdated"));
};
