export type OrderStatus =
    | 'NEW'
    | 'CONFIRMED'
    | 'PREPARING'
    | 'SHIPPING'
    | 'DELIVERED'
    | 'CANCELLED';

export type PaymentMethod = 'COD' | 'ONLINE';
export type PaymentStatus = 'UNPAID' | 'PAID' | 'REFUNDED';

export interface OrderItem {
    product: {
        _id: string;
        name?: string;
    };
    quantity: number;
    price: number;
}

export interface Order {
    _id: string;
    account: {
        _id: string;
        email?: string;
    };
    orderItems: OrderItem[];
    receiverPhone?: string;
    totalPrice: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    createdAt: string;
    paidAt?: string;
    deliveredAt?: string;
    cancelledAt?: string;
}
