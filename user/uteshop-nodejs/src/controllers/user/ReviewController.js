import * as reviewService from "../../services/reviewService.js";

export const submitReview = async (req, res) => {
  try {
    const { orderId, productId, rating, comment } = req.body;

    if (!orderId || !productId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin bắt buộc: orderId, productId, rating",
      });
    }

    const review = await reviewService.submitReview(
      req.user.userId,
      orderId,
      productId,
      parseInt(rating),
      comment
    );

    return res.json({ success: true, data: review });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewService.getReviewsByProduct(productId);
    return res.json({ success: true, data: reviews });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const getRatingSummary = async (req, res) => {
  try {
    const { productId } = req.params;
    const summary = await reviewService.getProductRatingSummary(productId);
    return res.json({ success: true, data: summary });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
