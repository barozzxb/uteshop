import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import type { Order } from "@/types/order";
import OrderDetailModal from "./components/OrderDetailModal";

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const fetchOrders = async () => {
        const res = await orderService.getOrders();
        setOrders(res.data.data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusClass = (status: string) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Delivered":
                return "bg-green-100 text-green-800";
            case "Canceled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-indigo-600">Order Management</h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Email
                            </th>
                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                                Total
                            </th>
                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((o) => (
                            <tr
                                key={o._id}
                                onClick={() => setSelectedOrder(o)}
                                className="hover:bg-gray-50 transition cursor-pointer text-gray-800 text-sm"
                            >
                                <td className="px-4 py-2">{o._id.slice(-6)}</td>
                                <td className="px-4 py-2">{o.account?.email}</td>
                                <td className="px-4 py-2 text-right">
                                    {o.totalPrice.toLocaleString()} ₫
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                                            o.status
                                        )}`}
                                    >
                                        {o.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center py-4 text-gray-500 text-sm"
                                >
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedOrder && (
                <OrderDetailModal
                    orderId={selectedOrder._id}
                    onClose={() => setSelectedOrder(null)}
                    onUpdated={fetchOrders}
                />
            )}
        </div>
    );
};

export default Orders;
