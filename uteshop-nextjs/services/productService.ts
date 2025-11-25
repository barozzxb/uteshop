import axiosClient from "@/utils/axiosClient";

export const getAllProductPage = async ({ genre, page = 1, limit = 10 }: {
    genre?: string;
    page?: number;
    limit?: number;
}) => {
    const res = await axiosClient.get(`/products?genre=${genre ?? ""}&page=${page}&limit=${limit}`);
    if (res.status === 200) {
        return {success: true, body: res.data};
    }
    return {success: false, body: res.data};
}

export const getNewProducts = async () => {
    const res = await axiosClient.get(`/products/new`);
    if (res.status === 200) {
        return {success: true, body: res.data};
    }
    return {success: false, body: res.data};
}