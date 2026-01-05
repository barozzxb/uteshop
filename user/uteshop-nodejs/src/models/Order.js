import mongoose from "mongoose";
import orderItemSchema from './OrderItem.js';
import addressSchema from './Address.js'

const orderSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "account", required: true },
  orderItems: [orderItemSchema],
  shippingAddress: addressSchema,
  receiverPhone: String,
  note: String,
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: [
      "NEW",           // Đơn mới
      "CONFIRMED",     // Đã xác nhận
      "PREPARING",     // Chuẩn bị hàng
      "SHIPPING",      // Đang giao
      "DELIVERED",     // Đã giao
      "CANCELLED"      // Hủy / yêu cầu hủy
    ],
    default: "NEW"
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "ONLINE"],
    default: "COD"
  },
  paymentStatus: {
    type: String,
    enum: ["UNPAID", "PAID", "REFUNDED"],
    default: "UNPAID"
  },
  createdAt: { type: Date, default: Date.now },
  paidAt: Date,
  deliveredAt: Date,
  cancelledAt: Date
});

const Order = mongoose.model("order", orderSchema);
export default Order;