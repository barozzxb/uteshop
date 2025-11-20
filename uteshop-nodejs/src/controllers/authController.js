const User = require("../models/User");
const crypto = require("crypto"); // Có sẵn trong Node.js
const nodemailer = require("nodemailer");

// Cấu hình gửi mail (Nên đưa vào file config riêng, nhưng viết ở đây cho gọn)
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Hoặc cấu hình SMTP của host khác
    auth: {
      user: process.env.EMAIL_USERNAME, // Email của bạn trong .env
      pass: process.env.EMAIL_PASSWORD, // App Password trong .env
    },
  });

  const mailOptions = {
    from: '"UteShop Support" <noreply@uteshop.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

// API 1: Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy email này trong hệ thống." });
    }

    // Tạo token ngẫu nhiên
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token để lưu vào DB (bảo mật hơn lưu text trần)
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    // Token hết hạn sau 10 phút
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // Tạo link gửi về client (Frontend port 3000)
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `Bạn vừa yêu cầu đặt lại mật khẩu. Vui lòng click vào link sau:\n\n${resetUrl}\n\nLink này sẽ hết hạn sau 10 phút.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Đặt lại mật khẩu UteShop",
        message,
      });

      res
        .status(200)
        .json({ status: "success", message: "Email đã được gửi!" });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res
        .status(500)
        .json({ message: "Lỗi gửi email. Vui lòng thử lại sau." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API 2: Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  try {
    // Hash token từ URL để so sánh với DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // Kiểm tra xem còn hạn không
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn." });
    }

    // Đặt pass mới (Lưu ý: Ở thực tế bạn cần hash password này bằng bcrypt trước khi lưu)
    // Ví dụ: user.password = await bcrypt.hash(req.body.password, 12);
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res
      .status(200)
      .json({ status: "success", message: "Đổi mật khẩu thành công!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
