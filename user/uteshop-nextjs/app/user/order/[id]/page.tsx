"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById, checkoutOrder } from "@/services/orderService";

const BACKEND_HOST = process.env.NEXT_PUBLIC_HOST_URL;

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
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");

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
    const { province, district, ward, detail } = shippingAddress;
    if (!province || !district || !ward || !detail || !receiverPhone) {
      alert("Vui lòng nhập đầy đủ thông tin giao hàng và số điện thoại");
      return;
    }

    const res = await checkoutOrder(id as string, {
      shippingAddress,
      receiverPhone,
      note,
      paymentMethod,
    });

    if (res.success) {
      router.push(`/user/order/${id}/success`);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
      </div>
    );

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Không tìm thấy đơn hàng</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Xác nhận đơn hàng
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 text-sm font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">
              <div className="md:col-span-6">Sản phẩm</div>
              <div className="md:col-span-2 text-center">Đơn giá</div>
              <div className="md:col-span-2 text-center">Số lượng</div>
              <div className="md:col-span-2 text-right">Thành tiền</div>
            </div>

            <div className="divide-y divide-gray-200">
              {order.orderItems.map((item: any) => {
                const product = item.product;
                const imageUrl = product.avatar || product.images?.[0]?.url || "/uploads/products/placeholder.png";

                return (
                  <div key={item._id} className="p-5 hover:bg-gray-50 transition">
                    <div className="md:hidden flex gap-4 items-start">
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-white">
                        <img
                          src={`${BACKEND_HOST}${imageUrl}`}
                          alt={product.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <div className="mt-3 grid grid-cols-3 text-sm gap-y-2">
                          <span className="text-gray-500">Đơn giá:</span>
                          <span className="col-span-2 text-right font-bold text-orange-600">
                            {item.price.toLocaleString("vi-VN")}₫
                          </span>

                          <span className="text-gray-500">Số lượng:</span>
                          <span className="col-span-2 text-right font-medium">
                            {item.quantity}
                          </span>

                          <span className="text-gray-500">Thành tiền:</span>
                          <span className="col-span-2 text-right font-bold text-orange-600">
                            {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-6 flex gap-4 items-center">
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-white">
                          <img
                            src={`${BACKEND_HOST}${imageUrl}`}
                            alt={product.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <p className="font-medium text-gray-900 line-clamp-2">
                          {product.name}
                        </p>
                      </div>

                      <div className="md:col-span-2 text-center">
                        <p className="font-bold text-gray-900">
                          {item.price.toLocaleString("vi-VN")}₫
                        </p>
                      </div>

                      <div className="md:col-span-2 text-center font-medium text-gray-900">
                        {item.quantity}
                      </div>

                      <div className="md:col-span-2 text-right">
                        <p className="font-bold text-orange-600">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Thông tin giao hàng
            </h2>

            <div className="space-y-4">
              <input
                type="tel"
                placeholder="Số điện thoại người nhận"
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition"
              />

              <input
                placeholder="Tỉnh / Thành phố"
                value={shippingAddress.province}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, province: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition"
              />

              <input
                placeholder="Quận / Huyện"
                value={shippingAddress.district}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, district: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition"
              />

              <input
                placeholder="Phường / Xã"
                value={shippingAddress.ward}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, ward: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition"
              />

              <input
                placeholder="Địa chỉ chi tiết (số nhà, đường...)"
                value={shippingAddress.detail}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, detail: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition"
              />

              <textarea
                rows={3}
                placeholder="Ghi chú cho shipper (tùy chọn)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition resize-none"
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Phương thức thanh toán
            </h2>

            <div className="space-y-4">
              <label className="flex items-center gap-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="w-5 h-5 text-orange-500 focus:ring-orange-400"
                />
                <span className="text-gray-700">Thanh toán khi nhận hàng (COD)</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "ONLINE"}
                  onChange={() => setPaymentMethod("ONLINE")}
                  className="w-5 h-5 text-orange-500 focus:ring-orange-400"
                />
                <span className="text-gray-700">Thanh toán online</span>
              </label>
            </div>
          </div>
        </div>

        <div className="h-fit">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Tóm tắt đơn hàng
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Tổng tiền hàng</span>
                <span className="font-bold">
                  {order.totalPrice.toLocaleString("vi-VN")}₫
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span className="font-medium">Miễn phí</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-bold">Thành tiền</span>
                  <span className="text-xl font-bold text-orange-600">
                    {order.totalPrice.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition"
            >
              Xác nhận & Thanh toán
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Bằng việc nhấn nút trên, bạn đồng ý với điều khoản mua hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}