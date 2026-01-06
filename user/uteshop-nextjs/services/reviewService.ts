export interface SubmitReviewData {
  orderId: string;
  productId: string;
  rating: number;
  comment?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const submitReview = async (data: SubmitReviewData) => {
  const token = localStorage.getItem("token") || "";

  const res = await fetch(`${API_BASE_URL}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Lỗi server" }));
    throw new Error(error.message || "Gửi đánh giá thất bại");
  }

  return await res.json();
};

export const getProductReviews = async (productId: string) => {
  const token = localStorage.getItem("token") || "";

  const res = await fetch(`${API_BASE_URL}/review/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Không thể tải đánh giá");
  return await res.json();
};

export const getProductRatingSummary = async (productId: string) => {
  const token = localStorage.getItem("token") || "";

  const res = await fetch(`${API_BASE_URL}/review/${productId}/rating`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Không thể tải thông tin đánh giá");
  return await res.json();
};
