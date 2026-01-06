"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getMyCart,
  updateCartItem,
  removeCartItem,
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
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
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
      productIds: selectedProductIds,
    });
    if (res.success) {
      router.push(`/user/order/${res.data._id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Giỏ hàng của bạn đang trống</h2>
          <p className="text-gray-600 mb-8">Hãy thêm sản phẩm để tiếp tục mua sắm!</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  const selectedItems = cart.items.filter((i) =>
    selectedProductIds.includes(i.productId._id)
  );

  const total = selectedItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Bỏ bg-gray-50, để nền trắng mặc định */}

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Giỏ hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách sản phẩm */}
        <div className="lg:col-span-2 space-y-6">
          {cart.items.map((item) => (
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

        {/* Tóm tắt đơn hàng */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Tóm tắt đơn hàng</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Tạm tính ({selectedItems.length} sản phẩm)</span>
              <span className="font-medium">{total.toLocaleString("vi-VN")}₫</span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span className="text-lg">Thành tiền</span>
                <span className="text-orange-600 text-xl">
                  {total.toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>

            <button
              disabled={selectedProductIds.length === 0}
              onClick={handleCreateOrder}
              className="mt-5 w-full py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {selectedProductIds.length === 0
                ? "Vui lòng chọn sản phẩm"
                : "Tiến hành đặt hàng"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="text-orange-600 hover:text-orange-700 font-medium underline"
        >
          ← Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
}