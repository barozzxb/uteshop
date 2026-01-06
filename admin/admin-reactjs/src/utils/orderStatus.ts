import type { OrderStatus } from '@/types/order';

export const ORDER_FLOW: OrderStatus[] = [
    'NEW',
    'CONFIRMED',
    'PREPARING',
    'SHIPPING',
    'DELIVERED',
];

export const getNextStatuses = (current: OrderStatus): OrderStatus[] => {
    if (current === 'DELIVERED' || current === 'CANCELLED') return [];

    const currentIndex = ORDER_FLOW.indexOf(current);
    return ORDER_FLOW.slice(currentIndex + 1);
};

export const canCancel = (current: OrderStatus) =>
    current === 'NEW' || current === 'CONFIRMED';
