import express from 'express';
const prodRouter = express.Router();
import ProductController from '../controllers/ProductController.js';

const prodController = new ProductController();

prodRouter.get("/new", prodController.getNewProducts);
prodRouter.get("/top-sales", prodController.getTopSaleProduct);
prodRouter.get("/most-views", prodController.getMostViewsProduct);
prodRouter.get("/all", prodController.getAllProducts);
prodRouter.get("/", prodController.getAllProductsPage); // query params
prodRouter.get("/:id", prodController.getProductBySku); // :id cuối cùng

export default prodRouter;
