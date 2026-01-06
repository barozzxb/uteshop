"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { submitReview } from "@/services/reviewService";
import { Star } from "lucide-react";

const BACKEND_HOST = process.env.NEXT_PUBLIC_HOST_URL;

export default function ReviewPage() {
  const { orderId, productId } = useParams<{ orderId: string; productId: string }>();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const product = {
    name: "Tên sản phẩm đang tải...",
    image: "/uploads/products/placeholder.png",
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Vui lòng chọn số sao đánh giá");
      return;
    }

    setLoading(true);
    try {
      const res = await submitReview({
        orderId,
        productId,
        rating,
        comment: comment.trim(),
      });

      if (res.success) {
        toast.success("Cảm ơn bạn đã đánh giá sản phẩm!");
        router.push("/user/order");
      } else {
        toast.error(res.message || "Gửi đánh giá thất bại");
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Đánh giá sản phẩm
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-300 bg-gray-50 flex-shrink-0">
              <img
                src={`${BACKEND_HOST}${product.image}`}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
          </div>

          <div className="mb-10 text-center">
            <p className="text-lg font-medium text-gray-800 mb-6">
              Bạn hài lòng với sản phẩm này đến mức nào?
            </p>
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={56}
                    className={`transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="mt-4 text-lg font-medium text-orange-600">
                {rating === 5 && "Tuyệt vời!"}
                {rating === 4 && "Rất tốt"}
                {rating === 3 && "Bình thường"}
                {rating === 2 && "Tạm được"}
                {rating === 1 && "Không hài lòng"}
              </p>
            )}
          </div>

          <div className="mb-10">
            <label className="block text-lg font-medium text-gray-800 mb-3">
              Nhận xét của bạn (tùy chọn)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              placeholder="Chia sẻ trải nghiệm của bạn: chất lượng, đóng gói, giao hàng..."
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              onClick={() => router.push("/user/order")}
              className="px-8 py-3.5 text-gray-700 font-medium border border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || rating === 0}
              className="px-10 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-md hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}