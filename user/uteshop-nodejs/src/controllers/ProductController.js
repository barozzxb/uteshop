import ProductService from '../services/ProductService.js';
import ApiResponse from '../utils/apiResponse.js';

class ManageProductController {

    async getAllProducts(req, res, next) {
        try {
            const data = await ProductService.getAllProducts();
            res.status(200).json(
                ApiResponse.success('Get all products successfully', data)
            );
        } catch (err) {
            next(err);
        }
    }

    async getAllProductsPage(req, res, next) {
        try {
            const { genre, limit, page, sort } = req.query;

            const data = await ProductService.getAllProductsPage({
                genre,
                limit,
                page,
                sort,
            });

            res.status(200).json(
                ApiResponse.success('Get products page successfully', data)
            );
        } catch (err) {
            next(err);
        }
    }

    async getNewProducts(req, res, next) {
        try {
            const data = await ProductService.getNewProducts(8);

            res.status(200).json(
                ApiResponse.success('Get new products successfully', data)
            );
        } catch (err) {
            next(err);
        }
    }

    async getTopSaleProduct(req, res, next) {
        try {
            const data = await ProductService.getTopSaleProduct(6);

            res.status(200).json(
                ApiResponse.success('Get top sale products successfully', data)
            );
        } catch (err) {
            next(err);
        }
    }

    async getMostViewsProduct(req, res, next) {
        try {
            const data = await ProductService.getMostViewsProduct(8);

            res.status(200).json(
                ApiResponse.success('Get most viewed products successfully', data)
            );
        } catch (err) {
            next(err);
        }
    }

    async getProductBySku(req, res, next) {
        try {
            const product = await ProductService.findBySku(req.params.id);
            const similarProducts = await ProductService.findSimilarProduct(product.genre, product.sku, 5)
            res.status(200).json(
                ApiResponse.success('Get product successfully', {product, similarProducts})
            );
        } catch (err) {
            next(err);
        }
    }
}

export default new ManageProductController();
