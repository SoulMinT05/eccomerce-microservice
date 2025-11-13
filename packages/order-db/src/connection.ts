import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

let isConnected = false;

export const connectOrderDB = async () => {
    if (isConnected) return;
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI must be required in .env');
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('Connected to MongoDB for Order Service');
    } catch (error) {
        console.error(error);
        throw error;
    }
};
