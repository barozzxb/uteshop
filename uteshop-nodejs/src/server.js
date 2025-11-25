import express from "express";
import cors from "cors";
import { sequelize, connectDB } from "./config/configdb.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"; 

const app = express();

app.use(cors());
// app.use(cors({ origin: "http://localhost:3000" })); 

app.use(express.json({ limit: "10mb" })); 
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes); 

const PORT = 5000;

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Profile API: http://localhost:${PORT}/api/profile?email=...`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();