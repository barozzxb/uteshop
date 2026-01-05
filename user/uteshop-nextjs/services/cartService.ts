import axiosClient from "@/utils/axiosClient";

export const getMyCart = async () => {
  const res = await axiosClient.get("/cart");
  return res.data;
};

export const addToCart = async (productId: string, quantity: number) => {
  const res = await axiosClient.post("/cart/add", { productId, quantity });
  return res.data;
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const res = await axiosClient.put("/cart/update", { productId, quantity });
  return res.data;
};

export const removeCartItem = async (productId: string) => {
  const res = await axiosClient.delete(`/cart/remove/${productId}`);
  return res.data;
};
