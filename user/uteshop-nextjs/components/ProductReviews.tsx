"use client";

import { useEffect, useState } from "react";
import { getProductReviews } from "@/services/reviewService";

interface Props {
  productId: string;
}

export default function ProductComments({ productId }: Props) {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (!productId) return;

    getProductReviews(productId).then((res) => {
      if (res.success) setReviews(res.data);
    });
  }, [productId]);

  return (
    <div className="space-y-6">
      {reviews.map((r) => (
        <div
          key={r._id}
          className="border-b pb-4 flex gap-4"
        >
          <img
            src={r.user.avatar || "/avatar.png"}
            className="w-10 h-10 rounded-full"
          />

          <div className="flex-1">
            <p className="font-semibold">{r.user.name}</p>

            <div className="flex text-orange-500">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < r.rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            <p className="text-gray-700 mt-1">{r.comment}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(r.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
