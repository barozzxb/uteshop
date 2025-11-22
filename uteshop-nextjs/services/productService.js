import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export const getProductById = async (id) => {
  // Gọi vào endpoint: http://localhost:4000/api/v1/products/:id
  return axios.get(`${API_URL}/products/${id}`);
};
