import express from 'express';
import { register } from '../controllers/AccountController.js';
import { getAccountByEmail, setActive } from '../controllers/AccountController.js';
import {sendOTPEmail} from '../controllers/OTPController.js';

const router = express.Router();

router.post('/register', register);
router.get('/account/:email', getAccountByEmail);
router.post('/account/activate', setActive);


router.post('/send-otp', sendOTPEmail);

export default router;