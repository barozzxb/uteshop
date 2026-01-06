import api from '../api/axios';
import type { Order, OrderStatus } from '@/types/order';

export const orderService = {
    getOrders(params?: {
        status?: OrderStatus;
        keyword?: string;
        fromDate?: string;
        toDate?: string;
    }) {
        return api.get<Order[]>('/admin/orders', { params });
    },

    getOrder(id: string) {
        return api.get<Order>(`/admin/orders/${id}`);
    },

    updateStatus(id: string, status: OrderStatus) {
        return api.patch(`/admin/orders/${id}/status`, { status });
    },
};
