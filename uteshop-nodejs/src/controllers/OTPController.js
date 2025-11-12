import sendMail from '../services/MailService.js';
import OTPService from '../services/OTPService.js';

export const sendOTPEmail = async (req, res) => {
    const { email } = req.body;
    const otp = OTPService.generateOTP();
    OTPService.storeOTP(email, otp);
    const result = await sendMail('otpTemplate', email, 'UTEShop OTP Verification', otp);
    if (!result.success) {
        return res.status(500).json({ message: 'Failed to send OTP email' });
    }
    res.status(200).json({ message: 'OTP email sent successfully' });
}

export const verifyOTP = async (req, res) => {
    const {email, otp} = req.body;
    const result = OTPService.verifyOTP(email, otp);
    if (!result.success) {
        return res.status(400).json({message: result.message});
    }
    res.status(200).json({message: result.message});
}