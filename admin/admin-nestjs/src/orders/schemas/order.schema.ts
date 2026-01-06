import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Account } from 'src/users/schemas/account.schema';

export type OrderDocument = Order & Document;

export enum OrderStatus {
    NEW = 'NEW',
    CONFIRMED = 'CONFIRMED',
    PREPARING = 'PREPARING',
    SHIPPING = 'SHIPPING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
    COD = 'COD',
    ONLINE = 'ONLINE',
}

export enum PaymentStatus {
    UNPAID = 'UNPAID',
    PAID = 'PAID',
    REFUNDED = 'REFUNDED',
}

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: Types.ObjectId, ref: Account.name, required: true })
    account: Types.ObjectId;

    @Prop({ type: Array, required: true })
    orderItems: any[];

    @Prop({ type: Object })
    shippingAddress: any;

    @Prop()
    receiverPhone: string;

    @Prop()
    note: string;

    @Prop({ required: true })
    totalPrice: number;

    @Prop({
        type: String,
        enum: OrderStatus,
        default: OrderStatus.NEW,
    })
    status: OrderStatus;

    @Prop({
        type: String,
        enum: PaymentMethod,
        default: PaymentMethod.COD,
    })
    paymentMethod: PaymentMethod;

    @Prop({
        type: String,
        enum: PaymentStatus,
        default: PaymentStatus.UNPAID,
    })
    paymentStatus: PaymentStatus;

    // Track thời điểm theo trạng thái
    @Prop()
    confirmedAt?: Date;

    @Prop()
    shippedAt?: Date;

    @Prop()
    deliveredAt?: Date;

    @Prop()
    cancelledAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
