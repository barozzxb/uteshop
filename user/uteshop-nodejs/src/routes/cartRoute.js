import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import * as cartController from "../controllers/user/CartController.js";

const cartRouter = express.Router();

cartRouter.get("/", authMiddleware, cartController.getMyCart);
cartRouter.post("/add", authMiddleware, cartController.addItem);
cartRouter.put("/update", authMiddleware, cartController.updateItem);
cartRouter.delete("/remove/:productId", authMiddleware, cartController.removeItem);

export default cartRouter;