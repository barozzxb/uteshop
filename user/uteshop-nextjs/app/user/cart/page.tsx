"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    getMyCart,
    updateCartItem,
    removeCartItem
} from "@/services/cartService";
import { createOrder } from "@/services/orderService";

import CartItem from "@/components/Cart/CartItem";
import { Cart } from "@/types/types";

export default function CartPage() {
    const router = useRouter();

    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);


    const fetchCart = async () => {
        const res = await getMyCart();
        setCart(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const toggleSelect = (productId: string) => {
        setSelectedProductIds(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleUpdate = async (productId: string, quantity: number) => {
        if (quantity < 1) return;
        await updateCartItem(productId, quantity);
        fetchCart();
    };

    const handleRemove = async (productId: string) => {
        await removeCartItem(productId);
        fetchCart();
    };

    const handleCreateOrder = async () => {
        if (selectedProductIds.length === 0) return;

        const res = await createOrder({
            productIds: selectedProductIds
        });

        if (res.success) {
            router.push(`/user/order/${res.data._id}`);
        }
    };


    if (loading) {
        return <div className="p-10 text-center">Đang tải...</div>;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="p-10 text-center">
                Giỏ hàng trống
                <div className="mt-4">
                    <Link href="/" className="text-blue-600">
                        Tiếp tục mua sắm
                    </Link>
                </div>
            </div>
        );
    }

    const selectedItems = cart.items.filter(i =>
        selectedProductIds.includes(i.productId._id)
    );


    const total = selectedItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
    );

    return (
        <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="md:col-span-2 space-y-4">
                {cart.items.map(item => (
                    <CartItem
                        key={item.productId._id}
                        item={item}
                        checked={selectedProductIds.includes(item.productId._id)}
                        onToggle={() => toggleSelect(item.productId._id)}
                        onUpdate={handleUpdate}
                        onRemove={handleRemove}
                    />


                ))}
            </div>

            <div className="border p-4 rounded h-fit">
                <h2 className="font-bold text-lg mb-4">Tóm tắt đơn hàng</h2>

                <div className="flex justify-between mb-2">
                    <span>Tạm tính</span>
                    <span>{total.toLocaleString("vi-VN")}₫</span>
                </div>

                <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Tổng</span>
                    <span className="text-red-600">
                        {total.toLocaleString("vi-VN")}₫
                    </span>
                </div>

                <button
                    disabled={selectedProductIds.length === 0}
                    onClick={handleCreateOrder}
                    className="mt-4 w-full bg-blue-600 disabled:bg-gray-400 text-white py-2 rounded"
                >
                    Đặt đơn
                </button>
            </div>
        </div>
    );
}
