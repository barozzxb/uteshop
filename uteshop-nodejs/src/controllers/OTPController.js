import sendMail from '../services/MailService.js';
import OTPService from '../services/OTPService.js';

export const sendOTPEmail = async (req, res) => {
    const { email } = req.body;
    const otp = OTPService.generateOTP();
    OTPService.storeOTP(email, otp);
    const result = await sendMail('otpTemplate', email, 'UTEShop OTP Verification', otp);
    if (!result.success) {
        return res.status(500).json(result);
    }
    res.status(200).json(result);
}

export const verifyOTP = async (req, res) => {
    const {email, otp} = req.body;
    const result = OTPService.verifyOTP(email, otp);
    if (!result.success) {
        return res.status(400).json(result);
    }
    res.status(200).json(result);
}