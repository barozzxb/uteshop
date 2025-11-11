const express = require("express");

const router = express.Router();

const users = [{ email: "nguyenngocvan.qng@gmail.com", password: "123456" }];

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy email" });
  }

  console.log(`Gửi link reset mật khẩu đến ${email}`);

  res.json({ message: "Đã gửi link reset đến email của bạn" });
});

router.put("/update-profile", (req, res) => {
  const { email, name, phone } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "Ko tìm thấy người dùng" });

  user.name = name || user.name;
  user.phone = phone || user.phone;

  res.json({ message: "Hồ sơ đã đc cập nhật", user });
});

module.exports = router;
