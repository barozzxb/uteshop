import 'dotenv/config';
import mongoose from 'mongoose';

const dbState = [
    {
    value: 0,
    description: 'Disconnected',
    },
    {
    value: 1,
    description: 'Connected',
    },
    {
    value: 2,
    description: 'Connecting',
    },
    {
    value: 3,
    description: 'Disconnecting',
    }
];
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const state = mongoose.connection.readyState;
        console.log(`Database connected: ${dbState[state].description}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export default connectDB;