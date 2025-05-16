import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const MONGO_URI = process.env.MONGODB_URL;
const connectDB = async () => {
  try {
    mongoose.connect(MONGO_URI);
  } catch (error) {
    process.exit(1);
  }
};

// Listen for connection errors
mongoose.connection.on('error', (err) => {
  process.exit(1);
});

// Handle disconnection
mongoose.connection.on('disconnected', () => {
  process.exit(1);
});


export { connectDB };