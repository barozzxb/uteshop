import mongoose from "mongoose";
import OrderItem from './OrderItem.js';
import Address from './Address.js'

const orderSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  createdAt: { type: Date, default: Date.now },
  shippingAddress: Address,
  totalPrice: Number,
  note: String,
  orderItems: [OrderItem]
});

const Order = mongoose.model("order", orderSchema);
export default Order;