import ProductService from '../services/ProductService.js';

const prodServ = new ProductService();

class ManageProductController {
    async getAllProducts(req, res) {
        try {
            const result = await prodServ.getAllProducts();
            if (!result.success) {
                return res.status(400).json(result);
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Server error', data: null });
        };
    };

    async getAllProductsPage(req, res){
        try {
            const {
                genre, limit = 10, page, sort = "-createdAt"
            } = req.query;

            const result = await prodServ.getAllProductsPage(genre, limit, page, sort);
            if (!result.success) {
                return res.status(400).json(result);
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Server error', data: null });
        };
    };

    async getNewProducts(req, res) {
        try {
            const result = await prodServ.getNewProducts(8);
            if (!result.success) {
                return res.status(400).json(result);
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Server error', data: null });
        };
    };

    async getTopSaleProduct(req, res) {
        try {
            const result = await prodServ.getTopSaleProduct(6);
            if (!result.success) {
                return res.status(400).json(result);
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Server error', data: null });
        };
    };

    async getMostViewsProduct(req, res) {
        try {
            const result = await prodServ.getMostViewsProduct(8);
            if (!result.success) {
                return res.status(400).json(result);
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Server error', data: null });
        };
    };

}

export default ManageProductController;