import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const submitReview = async (userId, orderId, productId, rating, comment = "") => {
  const order = await Order.findOne({ _id: orderId, account: userId, status: "DELIVERED" });
  if (!order) throw new Error("Đơn hàng không tồn tại hoặc chưa được giao");

  const orderItem = order.orderItems.find(item => item.product.toString() === productId);
  if (!orderItem) throw new Error("Sản phẩm không có trong đơn hàng này");

  const existing = await Review.findOne({ userId, productId, orderId });
  if (existing) throw new Error("Bạn đã đánh giá sản phẩm này rồi");

  const review = await Review.create({
    userId,
    productId,
    orderId,
    rating,
    comment: comment.trim() || undefined,
  });

  orderItem.reviewed = true;
  await order.save();

  await updateProductRating(productId);

  return review;
};

export const getReviewsByProduct = async (productId) => {
  return await Review.find({ productId })
    .populate("userId", "name avatar")
    .sort({ createdAt: -1 });
};

export const getProductRatingSummary = async (productId) => {
  const reviews = await Review.find({ productId });
  if (reviews.length === 0) {
    return {
      average: 0,
      total: 0,
      distribution: [5, 4, 3, 2, 1].map(stars => ({ stars, count: 0, percentage: 0 }))
    };
  }

  const total = reviews.length;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const average = Number((sum / total).toFixed(1));

  const distribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    return { stars, count, percentage: Math.round((count / total) * 100) };
  });

  return { average, total, distribution };
};

const updateProductRating = async (productId) => {
  const { average } = await getProductRatingSummary(productId);
  await Product.findByIdAndUpdate(productId, { rating: average });
};
