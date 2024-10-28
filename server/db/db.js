import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.URL); 
    console.log('Connected to MongoDB...', db.connection.host);
  } catch (error) {
    console.log('Error connecting to MongoDB', error.message);
    process.exit(1);
  }
};

export { dbConnect };
