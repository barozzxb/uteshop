const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/uploads", express.static(uploadDir));

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/uteshop";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Ket noi MongoDB thanh cong"))
  .catch((err) => console.error("Ket noi MongoDB that bai: ", err));

app.use("/api/v1/auth", authRoutes);

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
