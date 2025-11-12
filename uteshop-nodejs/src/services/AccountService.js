import Account from '../models/Account.js';
import AccountDetail from '../models/AccountDetail.js';
import bcrypt from 'bcrypt';

class AccountService {
    async createAccount(email, firstname, lastname, password) {
        const existingAccount = await Account.findOne({email});
        if (existingAccount) {
            return { success: false, message: 'Email already in use' };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAccount = await Account.create({ email, firstname, lastname, password: hashedPassword });
        const accDetail = new AccountDetail({ account: newAccount._id });
        await accDetail.save();
        newAccount.accDetail = accDetail._id;
        await newAccount.save();
        return { success: true, message: 'Account created successfully' };
    }

    async getAccountByEmail(email) {
        const acc = await Account.findOne({email}).populate('accDetail');
        if (!acc) {
            return { success: false, message: 'Account not found' };
        }
        return { success: true, data: acc };
    }

    async setActive(email) {
        const account = await Account.findOne({email});
        if (!account) {
            return { success: false, message: 'Account not found' };
        }
        account.status = true;
        await account.save();
        return { success: true, message: 'Account activated successfully' };
    }
}

export default AccountService;