// controllers/profileController.js
import User from "../models/user.js";

// GET: Lấy thông tin profile
export const getProfile = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "Thiếu email" });

  try {
    const user = await User.findOne({
      where: { email },
      attributes: ["fullName", "email", "phone", "avatar"],
    });

    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const nameParts = user.fullName.trim().split(" ");
    const firstname = nameParts.pop() || "";
    const lastname = nameParts.join(" ") || "";

    res.json({
      firstname,
      lastname,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone || "",
      avatar: user.avatar || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// PUT: Cập nhật profile
export const updateProfile = async (req, res) => {
  const { email, fullName, phone, avatar } = req.body;

  if (!email) return res.status(400).json({ message: "Thiếu email" });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    await user.update({
      fullName: fullName ?? user.fullName,
      phone: phone ?? user.phone,
      avatar: avatar ?? user.avatar,
    });

    const nameParts = user.fullName.trim().split(" ");
    const firstname = nameParts.pop() || "";
    const lastname = nameParts.join(" ") || "";

    res.json({
      message: "Cập nhật hồ sơ thành công!",
      user: {
        firstname,
        lastname,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone || "",
        avatar: user.avatar || null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};