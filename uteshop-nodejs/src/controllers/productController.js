// const Product = require("../models/Product");

// // Lấy danh sách sản phẩm (cho trang chủ)
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json({ success: true, data: products });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Lấy chi tiết 1 sản phẩm theo ID
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
//     }

//     res.status(200).json({ success: true, data: product });
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi server hoặc ID sai định dạng" });
//   }
// };

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

    async getAllProductsPage(req, res) {
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

    // Lấy chi tiết 1 sản phẩm theo ID
    async getProductBySku(req, res) {
        try {
            const product = await prodServ.findBySku(req.params.id);

            if (!product) {
                return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
            }

            res.status(200).json({ success: true, data: product });
        } catch (error) {
            res.status(500).json({ message: "Lỗi server hoặc ID sai định dạng" });
        }
    };

}

export default ManageProductController;