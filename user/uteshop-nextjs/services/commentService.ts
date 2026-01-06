import axiosClient from "@/utils/axiosClient";

export const getCommentsByProduct = async (productId: string) => {
    const res = await axiosClient.get(`/comments?productId=${productId}`);
    if (res.status === 200) return { success: true, data: res.data.data };
    return { success: false, data: [] };
};

export const addComment = async (productId: string, userId: string, content: string) => {
    const res = await axiosClient.post(`/comments`, { productId, userId, content });
    if (res.status === 201) return { success: true, data: res.data.data };
    return { success: false };
};
