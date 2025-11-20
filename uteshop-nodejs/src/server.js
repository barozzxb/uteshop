const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
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

//ket noi database
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
