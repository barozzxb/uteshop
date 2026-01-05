import express from "express";
import * as OrderController from "../controllers/user/OrderController.js";
import { authMiddleware } from "../middlewares/auth.js";

const orderRouter = express.Router();
orderRouter.use((req, res, next) => {
    console.log("ORDER ROUTE HIT:", req.method, req.originalUrl);
    next();
});

orderRouter.get("/", authMiddleware, OrderController.getOrders);
orderRouter.post("/create", authMiddleware, OrderController.createOrder);
orderRouter.get("/:id", authMiddleware, OrderController.getOrderById);
orderRouter.post("/:id/checkout", authMiddleware, OrderController.checkoutOrder);
orderRouter.post("/:id/cancel", authMiddleware, OrderController.cancelOrder);
export default orderRouter;