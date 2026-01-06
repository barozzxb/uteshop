import mongoose from "mongoose";
import { imageSchema } from "./Image.js";

const productSchema = new mongoose.Schema({
    sku: { type: String, unique: true, required: true },
    name: String,
    genre: { type: String, ref: "Genre" },
    description: String,
    price: Number,
    originalPrice: Number,
    images: [imageSchema],
    avatar: String,
    brand: String,
    rating: Number,
    stock: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

productSchema.index({ genre: 1, createdAt: -1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
