import 'dotenv/config';
import express from 'express';
import apiRoutes from './routes/api.js';
import connectDB from './config/database.js';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.use('/api/v1', apiRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

(async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
})();



