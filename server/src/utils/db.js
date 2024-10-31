import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connect.connection.host}, ${connect.connection.name}`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    setTimeout(connectMongoDB, 5000);
  }
};
