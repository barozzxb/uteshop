import ProductService from '../../services/ProductService.js';
import ApiResponse from '../../utils/apiResponse.js';
class ManageProductController {
    async addProduct(req, res) {
        try {
            const dto = {
                name: req.body.name,
                genre: req.body.genre,
                description: req.body.description,
                price: req.body.price,
                images: req.body.images,
                brand: req.body.brand,
            };

            const result = await ProductService.addProduct(dto);
            if (!result.success) {
                return res.status(400).json(result);
            }
            return res.status(201).json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Server error', data: null });
        };
    };

    async editProduct(req, res, next) {
        try {
            const { sku } = req.params;

            const dto = {
                name: req.body.name,
                genre: req.body.genre,
                description: req.body.description,
                price: req.body.price,
                originalPrice: req.body.originalPrice,
                images: req.body.images,
                avatar: req.body.avatar,
                brand: req.body.brand,
                stock: req.body.stock,
            };

            const data = await ProductService.updateProductBySku(sku, dto);

            return res.status(200).json(
                ApiResponse.success("Update product successfully", data)
            );
        } catch (err) {
            next(err);
        }
    }
}

export default ManageProductController;