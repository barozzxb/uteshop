import axiosClient from "@/utils/axiosClient"

//auth services
export const register = async (email: string, firstname: string, lastname: string, password: string) => {
    const res = await axiosClient.post("/auth/register", {
        email, firstname, lastname, password
    });
    const status = res.status;
    if (status === 201) {
        localStorage.setItem("email", email);
        return {success: true, data: res.data};
    }
    else {
        return {success: false, data: res.data};
    }
}

export const activeAccount = async (email:String) => {
    const res = await axiosClient.post('/account/activate', {email})
    if (res.status === 200) {
        return {success: true, data: res.data};
    }
    return {success: false, data: res.data};
}
