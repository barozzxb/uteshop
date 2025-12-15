import mongoose from "mongoose";

const productStatsSchema = mongoose.Schema({
    productsku: {type:String, required: true},
    views: Number,
    sold: Number,
});

const ProductStats = mongoose.model("productstats", productStatsSchema);
export default ProductStats;