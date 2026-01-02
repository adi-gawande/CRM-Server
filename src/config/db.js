import mongoose from "mongoose";

let isConnected = false; // Track the connection status (important for Vercel)

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI is not defined in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10s timeout
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    throw err;
  }
};

export default connectDB;
