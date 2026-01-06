import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import * as reviewController from "../controllers/user/ReviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", authMiddleware, reviewController.submitReview);

reviewRouter.get("/:productId", reviewController.getReviews);

reviewRouter.get("/:productId/rating", reviewController.getRatingSummary);

export default reviewRouter;
