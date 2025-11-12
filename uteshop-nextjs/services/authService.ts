import axiosClient from "@/utils/axiosClient"

//auth services
export const register = async (email: string, firstname: string, lastname: string, password: string) => {
    const res = await axiosClient.post("/register", {
        email, firstname, lastname, password
    });
    const status = res.status;
    if (status === 200) {
        return {success: true, message: res.data.message}
    }
    else {
        return {success: false, message: res.data.message}
    }
}