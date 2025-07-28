import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log("DB Connected Successfully🎉");
  } catch (error) {
    console.log("DB Connection failed.", error);
    throw error;
  }
};

export default connectDB;
