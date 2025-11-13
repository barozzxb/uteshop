import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    phonenumber: String,
    address: String,
    gender: String,
    dob: Date,
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'account', unique: true }
});

const AccountDetail = mongoose.model('accountdetail', accountSchema);
export default AccountDetail;