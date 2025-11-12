import crypto from "crypto";

const OTPStore = new Map();
const OTPService = {
    storeOTP: (email, otp) => {
        const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now
        OTPStore.set(email, { otp, expiry });
    },

    generateOTP: () => {
        return crypto.randomInt(100000, 999999).toString();
    },

    verifyOTP: (email, otp) => {
        const record = OTPStore.get(email);
        if (!record) return false;
        if (record.expiry < Date.now()) {
            OTPStore.delete(email);
            return false;
        }

        return record.otp === otp ? (OTPStore.delete(email), true) : false;
    }
}

export default OTPService;