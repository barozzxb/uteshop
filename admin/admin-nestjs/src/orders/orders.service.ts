import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderStatus } from './constants/order-status';
import { canCancel, isNextStatus } from './utils/order-flow.util';
import { Order } from './schemas/order.schema';
import { ProductStat } from 'src/products/schemas/product-stat.schema';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name)
        private readonly orderModel: Model<any>,

        @InjectModel(ProductStat.name)
        private readonly productStatModel: Model<ProductStat>,
    ) { }

    async findAll(query: any) {
        const filter: any = {};

        if (query.status) {
            filter.status = query.status;
        }

        if (query.keyword) {
            filter.$or = [
                { receiverPhone: { $regex: query.keyword, $options: 'i' } },
            ];
        }

        return this.orderModel
            .find(filter)
            .populate('account', 'email')
            .sort({ createdAt: -1 });
    }

    async findById(id: string) {
        const order = await this.orderModel
            .findById(id)
            .populate('account', 'email')
            .populate('orderItems.product', 'name');

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        return order;
    }

    async updateStatus(id: string, nextStatus: OrderStatus) {
        const order = await this.orderModel.findById(id);

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        const currentStatus: OrderStatus = order.status;

        if (
            currentStatus === OrderStatus.DELIVERED ||
            currentStatus === OrderStatus.CANCELLED
        ) {
            throw new BadRequestException('Order is locked');
        }

        if (nextStatus === OrderStatus.CANCELLED) {
            if (!canCancel(currentStatus)) {
                throw new BadRequestException(
                    'Cannot cancel order at this stage',
                );
            }

            order.status = OrderStatus.CANCELLED;
            order.cancelledAt = new Date();
            return order.save();
        }

        if (!isNextStatus(currentStatus, nextStatus)) {
            throw new BadRequestException('Invalid order status transition');
        }

        order.status = nextStatus;

        if (nextStatus === OrderStatus.DELIVERED) {
            order.deliveredAt = new Date();
            for (const item of order.orderItems) {
            await this.productStatModel.findOneAndUpdate(
                { productsku: item.product.sku },
                { $inc: { sold: item.quantity } },
                { upsert: true },
            );
        }
        }

        

        return order.save();
    }
}
