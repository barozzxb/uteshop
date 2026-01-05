import CommentService from "../services/CommentService.js";

class CommentController {
  static async getComments(req, res, next) {
    try {
      const { productId } = req.query;
      const comments = await CommentService.getCommentsByProduct(productId);
      return res.json({ success: true, data: comments });
    } catch (err) {
      next(err);
    }
  }

  static async addComment(req, res, next) {
    try {
      const { productId, userId, content } = req.body;
      const comment = await CommentService.addComment({ productId, userId, content });
      return res.status(201).json({ success: true, data: comment });
    } catch (err) {
      next(err);
    }
  }
}

export default CommentController;
