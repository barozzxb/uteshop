import Comment from "../models/Comment.js";

class CommentService {
  static async getCommentsByProduct(productId) {
    const comments = await Comment.find({ productId }).sort({ createdAt: -1 });
    return comments;
  }

  static async getCommentsCount(productId) {
    return await Comment.countDocuments({ productId });
  }

  static async addComment({ productId, userId, content }) {
    const comment = new Comment({ productId, userId, content });
    return await comment.save();
  }
}

export default CommentService;
