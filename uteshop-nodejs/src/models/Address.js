import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  type: { type: String, enum: ["HOME", "OFFICE", "OTHER"], default: "HOME" }, // loại địa chỉ
  country: { type: String, default: "Vietnam" },
  province: { type: String, required: true },
  district: { type: String, required: true },
  ward: { type: String, required: true },
  detail: { type: String, required: true }, // ví dụ: số nhà, đường, khu phố
}, { _id: false }); // embed schema trong Order
export default addressSchema;