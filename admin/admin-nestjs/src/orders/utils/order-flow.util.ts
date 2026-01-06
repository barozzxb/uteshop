import { OrderStatus, ORDER_FLOW } from '../constants/order-status';

export const canCancel = (current: OrderStatus) =>
    current === OrderStatus.NEW || current === OrderStatus.CONFIRMED;

export const isNextStatus = (
    current: OrderStatus,
    next: OrderStatus,
): boolean => {
    if (!ORDER_FLOW.includes(current)) return false;

    const currentIndex = ORDER_FLOW.indexOf(current);
    return ORDER_FLOW[currentIndex + 1] === next;
};
