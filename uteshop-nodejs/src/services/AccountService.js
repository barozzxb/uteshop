import Account from '../models/Account.js';
import AccountDetail from '../models/AccountDetail.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AccountService {
  async createAccount(email, password, firstName, lastName) {
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return { success: false, message: 'Email already in use', data: null };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = await Account.create({ email, password: hashedPassword , firstName, lastName});
    await newAccount.save();

    return { success: true, message: 'Account created successfully', data: null };
  }

  async getAccountByEmail(email) {
    const acc = await Account.findOne({ email }).populate('accDetail');
    if (!acc) {
      return { success: false, message: 'Account not found', data: null };
    }

    return { success: true, message: 'Account found', data: acc };
  }

  async setActive(email) {
    const account = await Account.findOne({ email });
    if (!account) {
      return { success: false, message: 'Account not found', data: null };
    }
    account.status = true;
    await account.save();
    return { success: true, message: 'Account activated successfully', data: null };
  }

  async login(email, password) {
    const user = await Account.findOne({ email });
    if (!user) return { success: false, message: 'Account not existed', data: null };

    const match = await bcrypt.compare(password, user.password);
    if (!match) return { success: false, message: 'Invalid information', data: null };

    const token = jwt.sign(
      { email: user.email, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return {
      success: true, message: 'Login successfully', data: {
        token,
        user: {
          email: user.email,
          role: user.role,
        },
      }
    };
  }
}

export default AccountService;
