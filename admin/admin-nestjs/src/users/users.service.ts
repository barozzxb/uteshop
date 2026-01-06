import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './schemas/account.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Account.name)
        private readonly accountModel: Model<Account>,
    ) { }

    async findAll(query: any) {
        const { page = 1, limit = 10, keyword = '' } = query;

        const filter = keyword
            ? {
                $or: [
                    { email: { $regex: keyword, $options: 'i' } },
                    { firstName: { $regex: keyword, $options: 'i' } },
                    { lastName: { $regex: keyword, $options: 'i' } },
                ],
            }
            : {};

        const data = await this.accountModel
            .find(filter)
            .select('-password')
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await this.accountModel.countDocuments(filter);

        return {
            data,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
            },
        };
    }

    async findById(id: string) {
        const user = await this.accountModel
            .findById(id)
            .select('-password');

        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: string, payload: Partial<Account>) {
        const user = await this.accountModel.findByIdAndUpdate(
            id,
            payload,
            { new: true },
        );

        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async toggleStatus(id: string) {
        const user = await this.accountModel.findById(id);
        if (!user) throw new NotFoundException('User not found');

        user.status = !user.status;
        await user.save();

        return user;
    }

    async changeRole(id: string, role: string) {
        const user = await this.accountModel.findByIdAndUpdate(
            id,
            { role },
            { new: true },
        );

        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async remove(id: string) {
        const user = await this.accountModel.findByIdAndDelete(id);
        if (!user) throw new NotFoundException('User not found');
        return { deleted: true };
    }
}
