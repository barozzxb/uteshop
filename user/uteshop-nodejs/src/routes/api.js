import express from 'express';
import { register, setActive, login } from '../controllers/AccountController.js';
import { sendOTPEmail, verifyOTP } from '../controllers/OTPController.js';
import ManageProductController from '../controllers/admin/ManageProductController.js';
import ManageGenreController from '../controllers/admin/ManageGenreController.js'

import { authMiddleware } from '../middlewares/auth.js';
import { authorizeRole } from '../middlewares/authorities.js';
import prodRouter from '../routes/productRoutes.js';

import accRouter from './accountRoute.js';
import cmtRouter from '../routes/commentRoutes.js';
import cartRouter from '../routes/cartRoute.js'
import orderRouter from './orderRoute.js';
import reviewRouter from './reviewRouter.js';
import { getOrders } from '../controllers/user/OrderController.js';

const mprodController = new ManageProductController();
const mgenreController = new ManageGenreController();



const router = express.Router();

router.post('/register', register);
router.post("/login", login);
router.post('/account/activate', setActive);


router.post('/send-otp', sendOTPEmail);
router.post('/verify-otp', verifyOTP);


// account routes
router.use("/account", accRouter);

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
router.put("/manage/product/:sku", authMiddleware, authorizeRole("ADMIN"), mprodController.editProduct);


//product
router.use("/products", prodRouter);

//comment
router.use("/comments", cmtRouter)

//cart
router.use("/cart", cartRouter);

router.use("/review", reviewRouter);


//order
router.get("/orders", authMiddleware, getOrders);
router.use("/order", orderRouter);
export default router;
