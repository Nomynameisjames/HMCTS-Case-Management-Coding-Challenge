
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//loads environment variables into process.env
dotenv.config();

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * Uses the connection string stored in the `mongodbURL` environment variable.
 */
const connectDB = async () => {
    try {
        // attempts connection to db
        const conn = await mongoose.connect(process.env.mongodbURL);
        console.log(`Database connected on ${conn.connection.host}`);

    }
    catch (error) {
        // Log an error message and exit the process if the connection fails
        console.log(`Database connection failed ${error.message}`); 
        process.exit(1);
    }
};

export default connectDB;