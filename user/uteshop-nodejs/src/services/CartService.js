import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCartByUser = async (userId) => {
    return Cart.findOne({ userId }).populate("items.productId");
};

export const addToCart = async (userId, productId, quantity) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = await Cart.create({
            userId,
            items: [
                {
                    productId,
                    quantity,
                    price: product.price
                }
            ]
        });
        return cart;
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({
            productId,
            quantity,
            price: product.price
        });
    }

    await cart.save();
    return cart;
};

export const updateCartItem = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    const item = cart.items.find(
        (i) => i.productId.toString() === productId
    );

    if (!item) throw new Error("Item not found");

    item.quantity = quantity;
    await cart.save();
    return cart;
};

export const removeCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
    );

    await cart.save();
    return cart;
};
