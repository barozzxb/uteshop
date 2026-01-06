import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../orders/schemas/order.schema';
import { Account, AccountDocument } from '../users/schemas/account.schema';
import { ProductStat, ProductStatDocument } from '../products/schemas/product-stat.schema';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
        @InjectModel(ProductStat.name) private productStatModel: Model<ProductStatDocument>,
    ) { }

    async getDashboardStats() {
        const deliveredOrders = await this.orderModel.find({ status: 'DELIVERED' });
        const shippingOrders = await this.orderModel.find({ status: 'SHIPPING' });

        const revenue = deliveredOrders.reduce((sum, o) => sum + o.totalPrice, 0);

        const now = new Date();
        const startYear = new Date(now.getFullYear(), 0, 1);
        const monthlyRevenueAgg = await this.orderModel.aggregate([
            { $match: { status: 'DELIVERED', createdAt: { $gte: startYear } } },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    total: { $sum: '$totalPrice' },
                },
            },
        ]);
        const monthlyRevenue = Array(12).fill(0);
        monthlyRevenueAgg.forEach(m => {
            monthlyRevenue[m._id - 1] = m.total;
        });

        const newCustomers = await this.accountModel
            .find()
            .sort({ createdAt: -1 })
            .limit(5); // ví dụ lấy 5 khách hàng mới nhất

        const topProducts = await this.productStatModel
            .find()
            .sort({ sold: -1 })
            .limit(10);

        return {
            revenue,
            deliveredOrders: deliveredOrders.length,
            shippingOrders: shippingOrders.length,
            topProducts,
            newCustomers,
            monthlyRevenue,
        };
    }
}
