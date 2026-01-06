import express from "express";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/favoriteController";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addFavorite);           // Thêm yêu thích
router.delete("/:productId", removeFavorite); // Xóa yêu thích
router.get("/", getFavorites);          // Lấy danh sách yêu thích

export default router;