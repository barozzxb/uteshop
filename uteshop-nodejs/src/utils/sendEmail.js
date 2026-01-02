const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: ' "UTESHOP Support" <noreply@uteshop.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html  //làm sau
  };

  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
