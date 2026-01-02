import express from "express";
import { loginUser,forgotPassword,
  resetPassword, } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);

export default router;

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

module.exports = router;
