import Product from '../models/Product.js';
import ProductStats from '../models/ProductStats.js';
import { getNextSkuByGenre } from '../utils/generateSKU.js';

class ProductService {
    async getAllProducts() {
        try {
            let result = await Product.find();
            return { success: true, message: 'Get product list sucessfully', data: result };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Unexpected error', data: null };
        }
    };

    async getAllProductsPage(genre, limit = 10, page, sort = "-createdAt") {
        try {
            const parsedLimit = Math.min(parseInt(limit, 10) || 10, 50);
            const filters = {};
            if (genre) filters.genre = genre;

            const p = Math.max(parseInt(page, 10), 1);
            const skip = (p - 1) * parsedLimit;

            const [items, total] = await Promise.all([
                Product.find(filters)
                    .sort(sort)
                    .skip(skip)
                    .limit(parsedLimit)
                    .lean(),
                Product.countDocuments(filters)
            ]);
            const totalPages = Math.ceil(total/parsedLimit);
            return { success: true, message: "Get products page successfully", data: { page: p, totalPages, limit: parsedLimit, total: total, items: items } };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Unexpected error', data: null };
        }
    };

    async getNewProducts(limit) {
        try {
            let result = await Product.find().sort({ createdAt: -1 }).limit(limit);
            return { success: true, message: 'Get product list sucessfully', data: result };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Unexpected error', data: null };
        }
    }

    async getTopSaleProduct(limit) {
        try {

            const stats = await ProductStats.find()
                .sort({ sold: -1 })
                .limit(limit)
                .select('productsku sold -_id')
                .lean();
            const skus = stats.map(s => s.productsku);
            if (ids.length === 0) return [];

            const products = await Product.find({ sku: { $in: skus } }).lean();

            return { success: true, message: 'Get most sales product list sucessfully', data: products };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Unexpected error', data: null };
        }
    };

    async getMostViewsProduct(limit) {
        try {

            const stats = await ProductStats.find()
                .sort({ views: -1 })
                .limit(limit)
                .select('productsku views -_id')
                .lean();
            const skus = stats.map(s => s.productsku);
            if (ids.length === 0) return [];

            const products = await Product.find({ sku: { $in: skus } }).lean();

            return { success: true, message: 'Get most views product list sucessfully', data: products };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Unexpected error', data: null };
        }
    };


    //For admin

    async addProduct(dto) {
        if (!dto) return { success: false, message: 'Null error', data: null };

        const sku = await getNextSkuByGenre({
            genreId: dto.genre
        });

        const prod = new Product({
            sku: sku,
            name: dto.name,
            genre: dto.genre,
            description: dto.description,
            price: dto.price,
            images: dto.images,
            brand: dto.brand,
            rating: 0
        });

        try {
            await prod.save();
            await ProductStats.create({
                productsku: sku,
                views: 0,
                sold: 0
            });
            return { success: true, message: 'Created product', data: prod.sku };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Unexpected error', data: null };
        }
    }
}

export default ProductService;