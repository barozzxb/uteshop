const emailTemplate =  {
    otpTemplate: (otp) =>( `
        <div style="font-family: Arial, sans-serif; text-align:center;">
            <h2>Your OTP Code</h2>
            <p>Use the following code to verify your account. Expires in 5 minutes.</p>
            <div style="font-size: 32px; font-weight: bold; color: #2d89ef;">${otp}</div>
            <p style="color:#888;">If you did not request this, ignore this email.</p>
        </div>
    `)
}

export default emailTemplate;