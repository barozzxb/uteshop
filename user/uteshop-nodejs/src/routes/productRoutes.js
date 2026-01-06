import express from 'express';
const prodRouter = express.Router();
import ProductController from '../controllers/ProductController.js';


prodRouter.get("/new", ProductController.getNewProducts);
prodRouter.get("/top-sales", ProductController.getTopSaleProduct);
prodRouter.get("/most-views", ProductController.getMostViewsProduct);
prodRouter.get("/all", ProductController.getAllProducts);
prodRouter.get("/", ProductController.getAllProductsPage); // query params
prodRouter.get("/:id", ProductController.getProductBySku); // :id cuối cùng

export default prodRouter;
