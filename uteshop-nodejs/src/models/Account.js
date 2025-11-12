import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    role: { type: String, default: 'USER' },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: false },
    accDetail: { type: mongoose.Schema.Types.ObjectId, ref: 'accountdetail' }
});

const Account = mongoose.model('account', accountSchema);
export default Account;