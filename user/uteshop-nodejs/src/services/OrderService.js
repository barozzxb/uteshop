import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import ApiError from "../utils/ApiError.js";

class OrderService {

    async createOrder(userId, productIds) {
        if (!Array.isArray(productIds) || productIds.length === 0) {
            throw new ApiError(400, "No cart items selected");
        }

        const cart = await Cart.findOne({ userId })
            .populate("items.productId");

        if (!cart) {
            throw new ApiError(404, "Cart not found");
        }

        const selectedItems = cart.items.filter(item =>
            productIds.includes(item.productId._id.toString())
        );

        if (selectedItems.length === 0) {
            throw new ApiError(400, "Selected items not found in cart");
        }

        const orderItems = selectedItems.map(item => ({
            product: item.productId._id,
            quantity: item.quantity,
            price: item.price
        }));

        const totalPrice = orderItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
        );

        const order = await Order.create({
            account: userId,
            orderItems,
            totalPrice,
            status: "NEW",
            paymentStatus: "UNPAID"
        });

        // remove ordered items from cart
        cart.items = cart.items.filter(item =>
            !productIds.includes(item.productId._id.toString())
        );
        await cart.save();

        return order;
    }



    async getOrderById(orderId, userId) {
        const order = await Order.findById(orderId)
            .populate("account", "email")
            .populate("orderItems.product", "name avatar price");

        if (!order) {
            throw new ApiError(404, "Order not found");
        }

        return order;
    }

    async checkout(orderId, userId, payload) {
        const { shippingAddress, receiverPhone, note, paymentMethod } = payload;

        if (!shippingAddress || !receiverPhone) {
            throw new ApiError(400, "Shipping address and phone are required");
        }

        const order = await Order.findOne({
            _id: orderId,
            account: userId
        });

        if (!order) {
            throw new ApiError(404, "Order not found");
        }

        if (order.status !== "NEW") {
            throw new ApiError(400, "Order already processed");
        }

        order.shippingAddress = shippingAddress;
        order.receiverPhone = receiverPhone;
        order.note = note;
        order.paymentMethod = paymentMethod || "COD";

        if (order.paymentMethod === "ONLINE") {
            order.paymentStatus = "PAID";
            order.paidAt = new Date();
        }

        await order.save();
        return order;
    }

    async getOrdersByUser(userId) {
        const orders = await Order.find({ account: userId })
            .sort({ createdAt: -1 }) // mới nhất lên đầu
            .populate("orderItems.product", "name avatar price")
            .populate("account", "email");

        return orders;
    }

    async cancelOrder(orderId, userId) {
        const order = await Order.findOne({ _id: orderId, account: userId });
        if (!order) throw new ApiError(404, "Order not found");

        // Chỉ cho hủy nếu còn 30 phút kể từ khi tạo và status PENDING
        const now = new Date();
        const diff = (now.getTime() - order.createdAt.getTime()) / 1000 / 60; // phút

        if (diff > 30) {
            throw new ApiError(400, "Đơn hàng đã quá 30 phút, không thể hủy");
        }

        if (order.status !== "NEW") {
            throw new ApiError(400, "Chỉ có đơn hàng mới có thể hủy");
        }

        order.status = "CANCELLED";
        order.cancelledAt = new Date();
        await order.save();

        return order;
    }
}

export default new OrderService();
