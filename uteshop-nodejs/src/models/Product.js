const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number }, // Giá gốc (để hiện giảm giá)

    // Danh mục (VD: Điện thoại, Laptop...)
    category: { type: String, required: true },

    // Số lượng tồn kho
    stock: { type: Number, required: true, default: 0 },

    // Ảnh đại diện chính
    avatar: { type: String },

    // Mảng chứa nhiều ảnh chi tiết (để chạy Swiper)
    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
