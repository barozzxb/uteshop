import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: String,
    description: String,
})

const Genre = mongoose.model("genre", genreSchema);
export default Genre;