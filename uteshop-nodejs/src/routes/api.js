import express from 'express';
import { register ,getAccountByEmail, setActive } from '../controllers/AccountController.js';
import {sendOTPEmail, verifyOTP} from '../controllers/OTPController.js';
import ManageProductController from '../controllers/admin/ManageProductController.js';
import ManageGenreController from '../controllers/admin/ManageGenreController.js'

import ProductController from '../controllers/ProductController.js';

const mprodController = new ManageProductController();
const mgenreController = new ManageGenreController();

const prodController = new ProductController();

const router = express.Router();

router.post('/auth/register', register);
router.get('/account/:email', getAccountByEmail);
router.post('/account/activate', setActive);


router.post('/auth/send-otp', sendOTPEmail);
router.post('/auth/verify-otp', verifyOTP);

const users = [{ email: "nguyenngocvan.qng@gmail.com", password: "123456" }];

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy email" });
  }

  console.log(`Gửi link reset mật khẩu đến ${email}`);

  res.json({ message: "Đã gửi link reset đến email của bạn" });
});

router.put("/update-profile", (req, res) => {
  const { email, name, phone } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "Ko tìm thấy người dùng" });

  user.name = name || user.name;
  user.phone = phone || user.phone;

  res.json({ message: "Hồ sơ đã đc cập nhật", user });
});

//admin routes

router.post('/manage/genre/add', mgenreController.addGenre);
router.post('/manage/product/add', mprodController.addProduct);

//product
router.get('/products', prodController.getAllProductsPage);
router.get('/products/top-sales', prodController.getTopSaleProduct);
router.get('/products/most-views', prodController.getMostViewsProduct);
router.get('/products/new', prodController.getNewProducts);

export default router;
