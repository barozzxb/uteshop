import express from 'express';
import { register ,getAccountByEmail, setActive } from '../controllers/AccountController.js';
import {sendOTPEmail, verifyOTP} from '../controllers/OTPController.js';

const router = express.Router();

router.post('/auth/register', register);
router.get('/account/:email', getAccountByEmail);
router.post('/account/activate', setActive);


router.post('/auth/send-otp', sendOTPEmail);
router.post('/auth/verify-otp', verifyOTP);

export default router;