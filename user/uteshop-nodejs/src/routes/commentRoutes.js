import express from "express";
import CommentController from "../controllers/CommentController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authorizeRole } from "../middlewares/authorities.js";

const cmtRouter = express.Router();

cmtRouter.get("/", CommentController.getComments);
cmtRouter.post("/", authMiddleware, authorizeRole("USER"), CommentController.addComment);

export default cmtRouter;
