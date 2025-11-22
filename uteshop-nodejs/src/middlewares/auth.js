const jwt = require("jsonwebtoken");

//verify token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token invalid" });
  }
};

//verify role
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "no authority to perform this action" });
    }
    next();
  };
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "khong tim thay user" });
    user.name = req.body.name || user.name;
    if (req.body.role) {
      user.role = req.body.role;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      data: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.protect = (req, res, next) => {
  console.log("1. Headers nhận được:", req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1];

  console.log("2. Token sau khi tách:", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Bạn chưa đăng nhập" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret_tam_thoi"
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token invalid or expired" });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "No authority to perform this action" });
    }
    next();
  };
};
