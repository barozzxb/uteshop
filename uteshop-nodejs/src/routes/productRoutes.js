import express from 'express';
const prodRouter = express.Router();
import ProductController from '../controllers/ProductController.js';

const prodController = new ProductController();

prodRouter.get("/", prodController.getAllProducts);
prodRouter.get("/:id", prodController.getProductBySku);
prodRouter.get('/products', prodController.getAllProductsPage);
prodRouter.get('/products/top-sales', prodController.getTopSaleProduct);
prodRouter.get('/products/most-views', prodController.getMostViewsProduct);
prodRouter.get('/products/new', prodController.getNewProducts);

export default prodRouter;
