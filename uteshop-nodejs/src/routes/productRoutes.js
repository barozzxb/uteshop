const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

router.get("/", getAllProducts); // API: /api/v1/products
router.get("/:id", getProductById); // API: /api/v1/products/12345

module.exports = router;
