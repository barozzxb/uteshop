import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema({
    url: String,
    alt: String,
})

const Image = mongoose.model("image", imageSchema);
export default Image;