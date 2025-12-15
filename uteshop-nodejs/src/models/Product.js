import mongoose from "mongoose";
import { imageSchema } from "./Image.js";
import Genre from "./Genre.js";

const productSchema = new mongoose.Schema({
    sku: { type: String, unique: true, required: true },
    name: String,
    genre: { type: String, ref: "genre" },
    description: String,
    price: Number,
    images: [imageSchema],
    brand: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now }
})

productSchema.index({genre: 1, createdAt: -1});

const Product = mongoose.model("product", productSchema);
export default Product;
