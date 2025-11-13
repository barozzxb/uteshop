import axiosClient from "@/utils/axiosClient";
import { activeAccount } from "./authService";

export const sendOTP = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
        return {success: false, message: "Unexpected error"};
    }

    const res = await axiosClient.post('/auth/send-otp', {email})
    if (res.status === 200) {
        return {success: true, data: res.data};
    }
    return {success: false, data: res.data};
}

export const verifyOTP = async (otp: string) => {
    const email = localStorage.getItem('email');
    if (!email) {
        return {success: false, message: "Unexpected error"};
    }

    const res = await axiosClient.post('/auth/verify-otp', {email, otp})
    if (res.status === 200) {
        const res1 = await activeAccount(email);

        localStorage.clear();
        return {success: true, data: res.data};
    }
    return {success: false, data: res.data};
}