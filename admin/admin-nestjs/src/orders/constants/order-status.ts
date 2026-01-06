export enum OrderStatus {
    NEW = 'NEW',
    CONFIRMED = 'CONFIRMED',
    PREPARING = 'PREPARING',
    SHIPPING = 'SHIPPING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export const ORDER_FLOW: OrderStatus[] = [
    OrderStatus.NEW,
    OrderStatus.CONFIRMED,
    OrderStatus.PREPARING,
    OrderStatus.SHIPPING,
    OrderStatus.DELIVERED,
];
