import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import type { Order, OrderStatus } from "@/types/order";
import { getNextStatuses, canCancel, ORDER_FLOW } from "@/utils/orderStatus";

interface Props {
    orderId: string;
    onClose: () => void;
    onUpdated: () => void;
}

const OrderDetailModal = ({ orderId, onClose, onUpdated }: Props) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        const res = await orderService.getOrder(orderId);
        setOrder(res.data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const updateStatus = async (status: OrderStatus) => {
        await orderService.updateStatus(order!._id, status);
        await fetchOrder();
        onUpdated();
    };

    if (loading || !order) return null;

    const currentIndex = ORDER_FLOW.indexOf(order.status);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold text-indigo-600 mb-4">
                    Order #{order._id.slice(-6)}
                </h2>

                <section className="mb-4 space-y-1">
                    <p className="text-gray-700">
                        <span className="font-semibold">Email:</span> {order.account?.email}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Phone:</span> {order.receiverPhone}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Total:</span>{" "}
                        {order.totalPrice.toLocaleString()} ₫
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Status:</span> {order.status}
                    </p>
                </section>

                <section className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Progress</h4>
                    <div className="flex flex-wrap gap-2">
                        {ORDER_FLOW.map((s, idx) => (
                            <span
                                key={s}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${idx <= currentIndex
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-500"
                                    }`}
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Items</h4>
                    <ul className="divide-y divide-gray-200 border rounded">
                        {order.orderItems.map((item, idx) => (
                            <li key={idx} className="px-4 py-2 flex justify-between text-gray-700 text-sm">
                                <span>
                                    {item.product?.name} × {item.quantity}
                                </span>
                                <span>{item.price.toLocaleString()} ₫</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Update Status</h4>
                    <div className="flex flex-wrap gap-2">
                        {getNextStatuses(order.status).map((s) => (
                            <button
                                key={s}
                                onClick={() => updateStatus(s)}
                                className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
                            >
                                Set {s}
                            </button>
                        ))}

                        {canCancel(order.status) && (
                            <button
                                onClick={() => updateStatus("CANCELLED")}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                            >
                                Cancel Order
                            </button>
                        )}

                        {getNextStatuses(order.status).length === 0 && !canCancel(order.status) && (
                            <p className="text-gray-500 text-sm">Order is locked</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default OrderDetailModal;
