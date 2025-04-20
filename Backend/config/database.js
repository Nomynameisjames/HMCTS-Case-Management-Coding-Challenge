import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongodbURL);
        console.log(`Database connected on ${conn.connection.host}`);

    }
    catch (error) {
        console.log(`Database connection failed ${error.message}`);
        process.exit(1);
    }
}; 

