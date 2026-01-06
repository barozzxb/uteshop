// services/favoriteService.js
import User from "../models/User.js";
import Product from "../models/Product.js";

export const getFavorites = async (userId) => {
  const user = await User.findById(userId).populate("favorites");
  return user?.favorites || [];
};

export const addFavorite = async (userId, productId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Nếu đã có trong favorites thì không thêm
  if (!user.favorites.includes(productId)) {
    user.favorites.push(productId);
    await user.save();
  }
  return user.favorites;
};

export const removeFavorite = async (userId, productId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.favorites = user.favorites.filter(
    (fav) => fav.toString() !== productId.toString()
  );
  await user.save();
  return user.favorites;
};