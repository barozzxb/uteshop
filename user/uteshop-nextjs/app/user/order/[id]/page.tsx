"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById, checkoutOrder } from "@/services/orderService";

type ShippingAddress = {
    type: "HOME" | "OFFICE" | "OTHER";
    country: string;
    province: string;
    district: string;
    ward: string;
    detail: string;
};

export default function OrderDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
        type: "HOME",
        country: "Vietnam",
        province: "",
        district: "",
        ward: "",
        detail: "",
    });

    const [receiverPhone, setReceiverPhone] = useState("");
    const [note, setNote] = useState("");
    const [paymentMethod, setPaymentMethod] =
        useState<"COD" | "ONLINE">("COD");

    useEffect(() => {
        if (!id) return;
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        const res = await getOrderById(id as string);
        setOrder(res.data);
        setLoading(false);
    };

    const handleCheckout = async () => {
        const {province, district, ward, detail } = shippingAddress;
        if (!province || !district || !ward || !detail) {
            alert("Vui lòng nhập đầy đủ thông tin giao hàng");
            return;
        }

        const res = await checkoutOrder(id as string, {
            shippingAddress,
            receiverPhone,
            note,
            paymentMethod
        });

        if (res.success) {
            router.push(`/user/order/${id}/success`);
        }
    };

    if (loading) return <div className="p-10">Đang tải...</div>;
    if (!order) return <div className="p-10">Không tìm thấy đơn hàng</div>;

    return (
        <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="md:col-span-2 space-y-6">
                {/* Order items */}
                <div className="border rounded p-4">
                    <h2 className="font-bold mb-4">Sản phẩm</h2>

                    {order.orderItems.map((item: any) => (
                        <div
                            key={item._id}
                            className="flex justify-between mb-2"
                        >
                            <span>
                                {item.product.name} × {item.quantity}
                            </span>
                            <span>
                                {(item.price * item.quantity).toLocaleString(
                                    "vi-VN"
                                )}
                                ₫
                            </span>
                        </div>
                    ))}
                </div>

                {/* Shipping info */}
                <div className="border rounded p-4 space-y-3">
                    <h2 className="font-bold">Thông tin giao hàng</h2>

                    <input
                        className="input"
                        placeholder="Số điện thoại"
                        value={receiverPhone}
                        onChange={e =>
                            setReceiverPhone(e.target.value)
                        }
                    />

                    <input
                        className="input"
                        placeholder="Tỉnh / Thành phố"
                        value={shippingAddress.province}
                        onChange={e => setShippingAddress({...shippingAddress, province: e.target.value})}
                    />

                    <input
                        className="input"
                        placeholder="Quận / Huyện"
                        value={shippingAddress.district}
                        onChange={e => setShippingAddress({...shippingAddress, district: e.target.value})}
                    />

                    <input
                        className="input"
                        placeholder="Phường / Xã"
                        value={shippingAddress.ward}
                        onChange={e => setShippingAddress({...shippingAddress, ward: e.target.value})}
                    />

                    <input
                        className="input"
                        placeholder="Địa chỉ chi tiết"
                        value={shippingAddress.detail}
                        onChange={e => setShippingAddress({...shippingAddress, detail: e.target.value})}
                    />

                    <textarea
                        className="input"
                        placeholder="Ghi chú"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    />
                </div>

                {/* Payment */}
                <div className="border rounded p-4">
                    <h2 className="font-bold mb-2">
                        Phương thức thanh toán
                    </h2>

                    <label className="flex gap-2">
                        <input
                            type="radio"
                            checked={paymentMethod === "COD"}
                            onChange={() => setPaymentMethod("COD")}
                        />
                        Thanh toán khi nhận hàng (COD)
                    </label>

                    <label className="flex gap-2 mt-2">
                        <input
                            type="radio"
                            checked={paymentMethod === "ONLINE"}
                            onChange={() => setPaymentMethod("ONLINE")}
                        />
                        Thanh toán online
                    </label>
                </div>
            </div>

            {/* RIGHT */}
            <div className="border rounded p-4 h-fit">
                <h2 className="font-bold mb-4">Tóm tắt đơn hàng</h2>

                <div className="flex justify-between mb-2">
                    <span>Tổng tiền</span>
                    <span className="font-bold text-red-600">
                        {order.totalPrice.toLocaleString("vi-VN")}₫
                    </span>
                </div>

                <button
                    onClick={handleCheckout}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
                >
                    Xác nhận & Thanh toán
                </button>
            </div>
        </div>
    );
}
