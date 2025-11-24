import ProductService from '../../services/ProductService.js';

const prodServ = new ProductService();

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

            const result = await prodServ.addProduct(dto);
            if (!result.success) {
                return res.status(400).json(result);
            }
            return res.status(201).json(result);
        } catch (error) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Server error', data: null });
        };
    };

}

export default ManageProductController;