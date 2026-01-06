"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/services/orderService";
import Modal from "@/components/Modal"; // giả sử bạn đã có modal
import { Order } from "@/types/types";

export default function UserOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const fetchOrders = async () => {
        const res = await getOrders();
        if (res.success) setOrders(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return <div className="p-10 text-center">Đang tải đơn hàng...</div>;
    }

    if (orders.length === 0) {
        return <div className="p-10 text-center">Bạn chưa có đơn hàng nào.</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>

            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Mã đơn hàng</th>
                        <th className="p-2 border">Ngày đặt</th>
                        <th className="p-2 border">Trạng thái</th>
                        <th className="p-2 border">Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr
                            key={order._id}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => setSelectedOrder(order)}
                        >
                            <td className="p-2 border">{order._id.slice(-6).toUpperCase()}</td>
                            <td className="p-2 border">{new Date(order.createdAt).toLocaleString("vi-VN", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit"
                            })}</td>
                            <td className="p-2 border">{order.status}</td>
                            <td className="p-2 border">{order.totalPrice.toLocaleString("vi-VN")}₫</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal hiển thị chi tiết */}
            {selectedOrder && (
                <Modal
                    title={`Chi tiết đơn ${selectedOrder._id.slice(-6).toUpperCase()}`}
                    onClose={() => setSelectedOrder(null)}
                >
                    <div className="space-y-3">
                        <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
                        <p><strong>Phương thức thanh toán:</strong> {selectedOrder.paymentMethod}</p>
                        <p><strong>Địa chỉ giao hàng:</strong> {selectedOrder.shippingAddress?.detail}, {selectedOrder.shippingAddress?.ward}, {selectedOrder.shippingAddress?.district}, {selectedOrder.shippingAddress?.province}</p>
                        <p><strong>Điện thoại:</strong> {selectedOrder.receiverPhone}</p>
                        <p><strong>Ghi chú:</strong> {selectedOrder.note || "Không có"}</p>

                        <p className="mt-2 font-bold">Sản phẩm:</p>
                        <ul className="pl-4 list-disc">
                            {selectedOrder.orderItems.map(item => (
                                <li key={item.product._id}>
                                    {item.product.name} - {item.quantity} x {item.price.toLocaleString("vi-VN")}₫
                                </li>
                            ))}
                        </ul>

                        <p className="mt-2 font-bold">
                            Tổng: {selectedOrder.totalPrice.toLocaleString("vi-VN")}₫
                        </p>

                        {/* Track đơn hàng */}
                        <div className="mt-4 border-t pt-2 space-y-1">
                            <p className="font-bold">Theo dõi đơn hàng:</p>
                            <div className="flex flex-col gap-1">
                                {["NEW", "CONFIRMED", "SHIPPING", "DELIVERED"].map((status, idx) => (
                                    <div key={idx} className={`flex items-center gap-2 ${selectedOrder.status === status || ["DELIVERED"].includes(selectedOrder.status) ? "text-green-600 font-semibold" : "text-gray-400"}`}>
                                        <div className="w-4 h-4 rounded-full border-2 flex-shrink-0"></div>
                                        <span>{status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nút hủy đơn nếu còn <30 phút và status PENDING */}
                        {selectedOrder.status === "NEW" &&
                            (new Date().getTime() - new Date(selectedOrder.createdAt).getTime()) / 1000 / 60 <= 30 && (
                                <button
                                    onClick={async () => {
                                        if (!confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;
                                        await fetch(`/api/v1/user/orders/${selectedOrder._id}/cancel`, { method: "POST" });
                                        alert("Đơn hàng đã được hủy");
                                        setSelectedOrder(null);
                                        fetchOrders(); // cập nhật lại danh sách
                                    }}
                                    className="mt-3 w-full bg-red-600 text-white py-2 rounded"
                                >
                                    Hủy đơn
                                </button>
                            )}
                    </div>
                </Modal>
            )}

        </div>
    );
}
