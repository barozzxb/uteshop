import nodemailer from 'nodemailer';
import emailTemplate from '../utils/MailTemplate.js';
import "dotenv/config"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export default async function sendMail(template, to, subject, data) {

    let content = emailTemplate[template](data);

    const mailOptions = {
        from: `UTEShop <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: content
    };
    try{
        await transporter.sendMail(mailOptions);
        return{success: true, message: 'Email sent successfully'};
    } catch (error) {
        console.error("Error sending email:", error);
        return {success: false, message: 'Failed to send email'};
    }
}