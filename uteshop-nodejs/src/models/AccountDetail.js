import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phonenumber: String,
    address: String,
    gender: String,
    dob: Date,
    avatar: String,
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'account', unique: true }
});

const AccountDetail = mongoose.model('accountdetail', accountSchema);
export default AccountDetail;