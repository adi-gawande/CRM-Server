import dotenv from "dotenv";
import connectDB from "../src/config/db.js";
import app from "../src/app.js";

dotenv.config();

let isConnected = false;

// ✅ Vercel expects this kind of handler (req, res)
export default async function handler(req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("✅ MongoDB connected (Vercel handler)");
    }

    // ✅ Important: let Express handle the request directly
    return app(req, res);
  } catch (error) {
    console.error("❌ Error in Vercel handler:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
