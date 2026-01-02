import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

import apiRoutes from './routes/api.js';
import router from './routes/profileRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/database.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use('/api/v1', apiRoutes);
app.use('/api/v1/user', router);
app.use("/api/v1/auth", authRoutes);

// Connect to MongoDB
(async () => {
  try {
    await connectDB(); // connectDB trong config/database.js dùng mongoose.connect
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
})();
