import Account from '../models/Account.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

class AccountService {
  async createAccount(email, password, firstName, lastName) {
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      throw new ApiError(400, 'Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return Account.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
  }

  async getAccountByEmail(email) {
    const acc = await Account.findOne({ email }).populate('accDetail');
    if (!acc) {
      throw new ApiError(404, 'Account not found');
    }
    return acc;
  }

  async setActive(email) {
    const account = await Account.findOne({ email });
    if (!account) {
      throw new ApiError(404, 'Account not found');
    }

    account.status = true;
    await account.save();
  }

  async login(email, password) {
    const user = await Account.findOne({ email });
    if (!user) {
      throw new ApiError(400, 'Account not existed');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ApiError(400, 'Invalid information');
    }

    if (!process.env.JWT_SECRET) {
      throw new ApiError(500, 'JWT secret not configured');
    }

    const token = jwt.sign(
      { userId: user._id,email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    };
  }

  async getProfileByEmail(email) {
    const user = await Account.findOne({ email }).select("-password");
    if (!user) {
      throw new ApiError(404, `Account not found. Email: ${email}`);
    }
    return user;
  }

  async updateProfile(email, payload) {
    const user = await Account.findOne({ email });
    if (!user) {
      throw new ApiError(404, `Account not found. Email: ${email}`);
    }

    const allowedFields = [
      "firstName",
      "lastName",
      "phone",
      "avatar",
      "address",
      "gender",
      "dob",
    ];

    allowedFields.forEach(field => {
      if (payload[field] !== undefined) {
        user[field] = payload[field];
      }
    });

    await user.save();
    return user;
  }
}

export default new AccountService();
