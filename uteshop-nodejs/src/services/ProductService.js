import Product from '../models/Product.js';
import ProductStats from '../models/ProductStats.js';
import ApiError from '../utils/ApiError.js';
import { getNextSkuByGenre } from '../utils/generateSKU.js';

class ProductService {

    async getAllProducts() {
        const items = await Product.find().lean();
        return { items };
    }

    async getAllProductsPage({ genre, limit = 10, page = 1, sort = '-createdAt' }) {
        const parsedLimit = Math.min(Number(limit) || 10, 50);
        const currentPage = Math.max(Number(page) || 1, 1);
        const skip = (currentPage - 1) * parsedLimit;

        const filters = {};
        if (genre) filters.genre = genre;

        const [items, total] = await Promise.all([
            Product.find(filters)
                .sort(sort)
                .skip(skip)
                .limit(parsedLimit)
                .lean(),
            Product.countDocuments(filters),
        ]);

        return {
            page: currentPage,
            totalPages: Math.ceil(total / parsedLimit),
            limit: parsedLimit,
            total,
            items,
        };
    }

    async getNewProducts(limit = 8) {
        const items = await Product.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        return { items };
    }

    async getTopSaleProduct(limit = 6) {
        const stats = await ProductStats.find()
            .sort({ sold: -1 })
            .limit(limit)
            .select('productsku -_id')
            .lean();

        const skus = stats.map(s => s.productsku);
        if (!skus.length) return { items: [] };

        const items = await Product.find({ sku: { $in: skus } }).lean();
        return { items };
    }

    async getMostViewsProduct(limit = 8) {
        const stats = await ProductStats.find()
            .sort({ views: -1 })
            .limit(limit)
            .select('productsku -_id')
            .lean();

        const skus = stats.map(s => s.productsku);
        if (!skus.length) return { items: [] };

        const items = await Product.find({ sku: { $in: skus } }).lean();
        return { items };
    }

    async findBySku(sku) {
        const product = await Product.findOne({ sku }).lean();
        if (!product) {
            throw new ApiError(404, 'Product not found');
        }
        return product;
    }

    async findSimilarProduct(genre, excludeSku, limit = 5) {
        const similarProducts = await Product.find({
            genre: genre,
            sku: { $ne: excludeSku }
        })
            .limit(limit)
            .lean();
        if (!similarProducts) {
            throw new ApiError(404, 'Product not found');
        }
        return similarProducts;
    }

    // ADMIN
    async addProduct(dto) {
        if (!dto) {
            throw new ApiError(400, 'Invalid product data');
        }

        const sku = await getNextSkuByGenre({ genreId: dto.genre });

        const prod = await Product.create({
            sku,
            name: dto.name,
            genre: dto.genre,
            description: dto.description,
            price: dto.price,
            images: dto.images,
            brand: dto.brand,
            rating: 0,
        });

        await ProductStats.create({
            productsku: sku,
            views: 0,
            sold: 0,
        });

        return prod.sku;
    }

    async updateProductBySku(sku, dto) {
        if (!sku) {
            throw new ApiError(400, "SKU is required");
        }

        const product = await Product.findOne({ sku });
        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        const allowedFields = [
            "name",
            "genre",
            "description",
            "price",
            "originalPrice",
            "images",
            "avatar",
            "brand",
            "stock",
        ];

        allowedFields.forEach(field => {
            if (dto[field] !== undefined) {
                product[field] = dto[field];
            }
        });

        await product.save();

        return product;
    }

}

export default new ProductService();
