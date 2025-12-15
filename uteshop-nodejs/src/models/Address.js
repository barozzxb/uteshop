import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  type: String,
  country: String,
  province: String,
  district: String,
  ward: String,
  additional: String
});

const Address = mongoose.model("address", addressSchema);
export default Address;