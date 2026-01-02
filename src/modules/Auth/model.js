import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, lowercase: true, default: "" },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["consultant", "medical officer", "nurse", "staff"],
      default: "staff",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Auth", userSchema);
