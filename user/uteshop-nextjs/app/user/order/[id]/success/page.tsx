"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById } from "@/services/orderService";

export default function OrderSuccessPage() {
    const { id } = useParams(); // orderId từ route
    const router = useRouter();

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchOrder = async () => {
            try {
                const res = await getOrderById(id as string);
                if (res.success) {
                    setOrder(res.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) {
        return <div className="p-10 text-center">Đang tải...</div>;
    }

    if (!order) {
        return (
            <div className="p-10 text-center">
                Không tìm thấy đơn hàng.
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-lg text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Đặt hàng thành công!</h1>
                <p className="mb-2">Mã đơn hàng: <span className="font-mono">{order._id}</span></p>
                <p className="mb-2">Tổng tiền: <span className="font-bold">{order.totalPrice.toLocaleString("vi-VN")}₫</span></p>
                <p className="mb-2">Phương thức thanh toán: {order.paymentMethod}</p>
                <p className="mb-2">Trạng thái đơn hàng: {order.status}</p>
                <p className="mb-2">Ngày tạo: {new Date(order.createdAt).toLocaleString()}</p>

                <div className="mt-6">
                    <button
                        onClick={() => router.push("/")}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                        Quay về trang chủ
                    </button>
                </div>
            </div>

            <div className="mt-6 text-left">
                <h2 className="font-bold text-lg mb-2">Chi tiết sản phẩm:</h2>
                {order.orderItems.map((item: any) => (
                    <div
                        key={item.product._id}
                        className="flex justify-between py-2 border-b"
                    >
                        <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                        </div>
                        <div className="font-bold">{(item.price * item.quantity).toLocaleString("vi-VN")}₫</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
