import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, lowercase: true, default: "" },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [
        "consultant",
        "medical officer",
        "nurse",
        "staff",
        "admin", 
        "staff",
        "super-admin",
      ],
      default: "staff",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Auth", userSchema);
