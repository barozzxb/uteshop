import axiosClient from "@/utils/axiosClient";

export const getOrders = async () => {
    const res = await axiosClient.get("/orders");
    return res.data; // { success, message, data }
};

export const createOrder = async (payload: { productIds: string[] }) => {
    console.log("Payload: ", payload);
    const res = await axiosClient.post("/order/create", payload);
    return res.data;
};

export const getOrderById = async (orderId: string) => {
    const res = await axiosClient.get(`/order/${orderId}`);
    return res.data;
};

export const checkoutOrder = async (
    orderId: string,
    payload: {
        shippingAddress: any;
        receiverPhone: string;
        note?: string;
        paymentMethod: "COD" | "ONLINE";
    }
) => {
    const res = await axiosClient.post(
        `/order/${orderId}/checkout`,
        payload
    );
    return res.data;
};
