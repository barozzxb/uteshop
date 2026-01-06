"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById } from "@/services/orderService";

const BACKEND_HOST = process.env.NEXT_PUBLIC_HOST_URL;

export default function OrderSuccessPage() {
  const { id } = useParams();
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Không tìm thấy đơn hàng.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Thông báo thành công */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Đặt hàng thành công!
        </h1>
        <p className="text-lg text-gray-600">
          Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đã được ghi nhận.
        </p>
      </div>

      {/* Card thông tin đơn hàng */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Thông tin đơn hàng
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
          <div>
            <p className="text-gray-600">Mã đơn hàng</p>
            <p className="font-mono font-semibold text-gray-900">{order._id}</p>
          </div>
          <div>
            <p className="text-gray-600">Ngày đặt hàng</p>
            <p className="font-medium text-gray-900">
              {new Date(order.createdAt).toLocaleString("vi-VN")}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Phương thức thanh toán</p>
            <p className="font-medium text-gray-900">
              {order.paymentMethod === "COD"
                ? "Thanh toán khi nhận hàng (COD)"
                : "Thanh toán online"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Trạng thái đơn hàng</p>
            <p className="font-medium text-orange-600 capitalize">
              {order.status === "PENDING" ? "Chờ xử lý" : order.status}
            </p>
          </div>
        </div>

        <div className="border-t mt-6 pt-6">
          <div className="flex justify-between items-end">
            <p className="text-lg text-gray-600">Tổng thanh toán</p>
            <p className="text-3xl font-bold text-orange-600">
              {order.totalPrice.toLocaleString("vi-VN")}₫
            </p>
          </div>
        </div>
      </div>

      {/* Chi tiết sản phẩm - Có thêm ảnh nhỏ bên trái */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            Chi tiết sản phẩm ({order.orderItems.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {order.orderItems.map((item: any) => {
            const product = item.product;
            const imageUrl = product.avatar || product.images?.[0]?.url || "/uploads/products/placeholder.png";

            return (
              <div
                key={item.product._id}
                className="p-6 flex gap-5 items-center hover:bg-gray-50 transition"
              >
                {/* Ảnh sản phẩm nhỏ */}
                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-white">
                  <img
                    src={`${BACKEND_HOST}${imageUrl}`}
                    alt={product.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex-1">
                  <p className="font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Số lượng: {item.quantity}
                  </p>
                </div>

                {/* Thành tiền */}
                <p className="font-bold text-orange-600 text-lg">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nút hành động */}
      <div className="mt-10 text-center">
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-orange-500 text-white font-medium text-lg rounded-lg hover:bg-orange-600 transition"
        >
          Quay về trang chủ
        </button>

        <div className="mt-4">
          <button
            onClick={() => router.push("/user/order")}
            className="text-orange-600 hover:text-orange-700 font-medium underline"
          >
            Xem tất cả đơn hàng của tôi
          </button>
        </div>
      </div>
    </div>
  );
}