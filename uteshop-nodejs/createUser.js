// createUser.js
import bcrypt from "bcrypt";
import { sequelize } from "./src/config/configdb.js";
import User from "./src/models/user.js";

const createUser = async () => {
  try {
    await sequelize.sync(); // đảm bảo bảng đã tạo

    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await User.create({
      fullName: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      role: "USER",
    });

    console.log("User created:", user.toJSON());
    process.exit();
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

createUser();
