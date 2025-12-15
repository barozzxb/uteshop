import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: { type: String, default: 'USER' },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: false },
    firstName: String,
    lastName: String,
    phonenumber: String,
    address: String,
    gender: String,
    dob: Date,
    avatar: String,
});

const Account = mongoose.model('account', accountSchema);
export default Account;