import * as cartService from "../../services/CartService.js";

export const getMyCart = async (req, res) => {
    try {
        const cart = await cartService.getCartByUser(req.user.userId);
        return res.json({ success: true, data: cart });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
};

export const addItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.addToCart(
            req.user.userId,
            productId,
            quantity
        );
        return res.json({ success: true, data: cart });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.updateCartItem(
            req.user.userId,
            productId,
            quantity
        );
        return res.json({ success: true, data: cart });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
};

export const removeItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await cartService.removeCartItem(
            req.user.userId,
            productId
        );
        return res.json({ success: true, data: cart });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
};
