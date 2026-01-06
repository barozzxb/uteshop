import axios from "axios";

const API = "/api/favorites";

export const addFavorite = async (productId: string) => {
  return axios.post(API, { productId }).then(res => res.data);
};

export const removeFavorite = async (productId: string) => {
  return axios.delete(`${API}/${productId}`).then(res => res.data);
};

export const getFavorites = async () => {
  return axios.get(API).then(res => res.data);
};
