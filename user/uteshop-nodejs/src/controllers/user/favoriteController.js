import Favorite from "../models/Favorite";
import Product from "../models/Product";

export const addFavorite = async (req, res) => {
  try {
    const userId = req.user._id; // lấy từ middleware auth
    const { productId } = req.body;

    const existing = await Favorite.findOne({ user: userId, product: productId });
    if (existing) return res.status(400).json({ success: false, message: "Sản phẩm đã yêu thích" });

    const favorite = new Favorite({ user: userId, product: productId });
    await favorite.save();

    return res.json({ success: true, data: favorite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    await Favorite.findOneAndDelete({ user: userId, product: productId });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const favorites = await Favorite.find({ user: userId }).populate("product");

    res.json({ success: true, data: favorites.map(f => f.product) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
