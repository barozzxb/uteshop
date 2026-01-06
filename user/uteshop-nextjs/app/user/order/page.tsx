"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Thêm useRouter
import { getOrders } from "@/services/orderService";
import { toast } from "react-toastify";
import Modal from "@/components/Modal";
import { Order } from "@/types/types";

const BACKEND_HOST = process.env.NEXT_PUBLIC_HOST_URL;

export default function UserOrdersPage() {
  const router = useRouter(); // Khai báo router
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Đang tải đơn hàng...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-xl text-gray-600 mb-6">Bạn chưa có đơn hàng nào.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition"
        >
          Bắt đầu mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Đơn hàng của tôi</h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-orange-300 transition"
          >
            <div
              className="p-5 cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-gray-500">Mã đơn hàng</p>
                  <p className="font-mono font-semibold text-gray-900 text-base">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ngày đặt</p>
                  <p className="font-medium text-gray-900 text-base">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Trạng thái</p>
                  <p className={`font-semibold text-base ${order.status === "DELIVERED" ? "text-green-600" : order.status === "CANCELLED" ? "text-red-600" : "text-orange-600"}`}>
                    {order.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Tổng tiền</p>
                  <p className="font-bold text-orange-600 text-xl">
                    {order.totalPrice.toLocaleString("vi-VN")}₫
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
              <div className="space-y-5">
                {order.orderItems.map((item) => {
                  const product = item.product;
                  const imageUrl =
                    product.avatar ||
                    product.images?.[0]?.url ||
                    "/uploads/products/placeholder.png";

                  // Kiểm tra xem sản phẩm này đã được đánh giá chưa (nếu backend trả về trường reviewed)
                  const isReviewed = item.reviewed === true;

                  return (
                    <div key={item.product._id} className="flex gap-5 items-center">
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-white">
                        <img
                          src={`${BACKEND_HOST}${imageUrl}`}
                          alt={product.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="font-medium text-gray-900 line-clamp-2">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Số lượng: {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold text-orange-600 text-lg">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                      </p>

                      {/* Nút đánh giá riêng cho từng sản phẩm */}
                      {order.status === "DELIVERED" && (
                        <div className="ml-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Ngăn mở modal chi tiết
                              if (isReviewed) {
                                toast.info("Bạn đã đánh giá sản phẩm này rồi");
                                return;
                              }
                              // Chuyển hướng đến trang đánh giá riêng
                              router.push(`/user/review/${order._id}/${product._id}`);
                            }}
                            disabled={isReviewed}
                            className={`px-5 py-2 font-medium rounded-md transition ${
                              isReviewed
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-orange-500 text-white hover:bg-orange-600"
                            }`}
                          >
                            {isReviewed ? "Đã đánh giá" : "Đánh giá"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nút đánh giá cũ ở dưới cùng đã bị loại bỏ để tránh trùng lặp */}
          </div>
        ))}
      </div>

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
              {selectedOrder.orderItems.map((item) => (
                <li key={item.product._id}>
                  {item.product.name} - {item.quantity} x {item.price.toLocaleString("vi-VN")}₫
                </li>
              ))}
            </ul>

            <p className="mt-2 font-bold">
              Tổng: {selectedOrder.totalPrice.toLocaleString("vi-VN")}₫
            </p>

            <div className="mt-4 border-t pt-2 space-y-1">
              <p className="font-bold">Theo dõi đơn hàng:</p>
              <div className="flex flex-col gap-1">
                {["NEW", "CONFIRMED", "SHIPPING", "DELIVERED"].map((status) => (
                  <div key={status} className={`flex items-center gap-2 ${selectedOrder.status === status || ["DELIVERED"].includes(selectedOrder.status) ? "text-green-600 font-semibold" : "text-gray-400"}`}>
                    <div className="w-4 h-4 rounded-full border-2 flex-shrink-0"></div>
                    <span>{status}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedOrder.status === "NEW" &&
              (new Date().getTime() - new Date(selectedOrder.createdAt).getTime()) / 1000 / 60 <= 30 && (
                <button
                  onClick={async () => {
                    if (!confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;
                    await fetch(`/api/v1/user/orders/${selectedOrder._id}/cancel`, { method: "POST" });
                    alert("Đơn hàng đã được hủy");
                    setSelectedOrder(null);
                    fetchOrders();
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