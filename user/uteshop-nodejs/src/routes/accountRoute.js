import express from "express";
import { authorizeRole } from "../middlewares/authorities.js";
import { getAccountByEmail, getProfile, updateProfile } from "../controllers/AccountController.js";
import { authMiddleware } from "../middlewares/auth.js";

const accRouter = express.Router();

accRouter.get("/me", authMiddleware, authorizeRole("USER"), getProfile);
accRouter.put("/me", authMiddleware, authorizeRole("USER"), updateProfile);

accRouter.get('/:email', getAccountByEmail);
export default accRouter;
