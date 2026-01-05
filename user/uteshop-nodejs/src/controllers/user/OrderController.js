import orderService from "../../services/orderService.js";
import ApiResponse from "../../utils/apiResponse.js";

export const getOrders = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const orders = await orderService.getOrdersByUser(userId);

        return res.status(200).json(
            ApiResponse.success("Orders fetched successfully", orders)
        );
    } catch (err) {
        next(err);
    }
};

export const createOrder = async (req, res, next) => {
    try {
        const { productIds } = req.body;
        const order = await orderService.createOrder(
            req.user.userId,
            productIds
        );

        return res.status(201).json(
            ApiResponse.success("Order created successfully", order)
        );
    } catch (err) {
        console.log(err);
        return res
            .status(err.statusCode || 400)
            .json(err);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        const data = await orderService.getOrderById(id, userId);

        res.status(200).json(
            ApiResponse.success("Get order successfully", data)
        );
    } catch (err) {
        next(err);
    }
};

export const checkoutOrder = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        const data = await orderService.checkout(
            id,
            userId,
            req.body
        );

        res.status(200).json(
            ApiResponse.success("Checkout successfully", data)
        );
    } catch (err) {
        next(err);
    }
};

export const cancelOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await orderService.cancelOrder(id, req.user.userId);
        res.status(200).json(ApiResponse.success("Order cancelled successfully", order));
    } catch (err) {
        next(err);
    }
};