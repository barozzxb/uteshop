import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  price: Number
});

const OrderItem = mongoose.model("orderitems", orderItemSchema);
export default OrderItem;