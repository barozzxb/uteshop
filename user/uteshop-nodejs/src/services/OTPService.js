import crypto from "crypto";

const OTPStore = new Map();

const OTPService = {
    storeOTP: (email, otp, maxAttempts = 5) => {
        const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now
        OTPStore.set(email, { otp, expiry, attemptsLeft: maxAttempts });
    },

    generateOTP: () => {
        return crypto.randomInt(100000, 999999).toString();
    },

    verifyOTP: (email, otp) => {
        console.log(email + " " + otp);
        const record = OTPStore.get(email);
        console.log(record);
        console.log(OTPStore);
        if (!record) return {success: false, message: "OTP expired or not existed, try requesting another OTP", data: null};;
        if (record.expiry < Date.now()) {
            OTPStore.delete(email);
            return {success: false, message: "OTP expired", data: null};
        }

        if (record.otp.attemptsLeft <= 0) {
            OTPStore.delete(email);
            return {success: false, message: "Maximum attempts of this OTP reached", data: null};
        }

        if (otp !== record.otp) {
            record.otp.attemptsLeft--;
            return {success: false, message: `{Wrong OTP, try again. You still have ${record.otp.attemptsLeft} attempts left}`, data: null}
        }
        
        OTPStore.delete(email);
        return {success: true, message: "Verify successfully", data: null};
    }
}

export default OTPService;