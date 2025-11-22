const express = require("express");
const router = express.Router();

const {
  forgotPassword,
  resetPassword,
  login,
  updateProfile,
} = require("../controllers/authController");

const { protect } = require("../middlewares/auth");

const upload = require("../middlewares/uploadMiddleware");

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

router.put("/profile", protect, upload.single("avatar"), updateProfile);

module.exports = router;
