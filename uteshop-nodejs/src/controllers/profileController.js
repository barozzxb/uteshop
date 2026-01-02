import Account from "../models/Account.js";

export const getProfile = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "Thiếu email" });

  try {
    const user = await Account.findOne({email});

    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json({
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      phone: user.phone || "",
      address: user.address,
      gender: user.gender,
      dob: user.dob,
      avatar: user.avatar || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// PUT: Cập nhật profile
export const updateProfile = async (req, res) => {
  const { email, firstName, lastName, phone, avatar, address, gender, dob } = req.body; // thêm field mới

  if (!email) return res.status(400).json({ message: "Thiếu email" });

  try {
    const user = await Account.findOne({ email });
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    await user.update({
      firstName: firstName ?? user.firstName,
      lastName: lastName ?? user.lastName,
      phone: phone ?? user.phone,
      avatar: avatar ?? user.avatar,
      address: address ?? user.address,
      gender: gender ?? user.gender,
      dob: dob ?? user.dob,
    });

    res.json({
      message: "Cập nhật hồ sơ thành công!",
      user: {
        firstName,
        lastNname,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
        gender: user.gender || "",
        dob: user.dob || "",
        avatar: user.avatar || null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
