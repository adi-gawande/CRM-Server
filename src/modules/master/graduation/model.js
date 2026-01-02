import mongoose from "mongoose";

const graduationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Graduation = mongoose.model("Graduation", graduationSchema);
export default Graduation;
