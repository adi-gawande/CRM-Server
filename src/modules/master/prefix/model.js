import mongoose from "mongoose";

const prefixSchema = new mongoose.Schema(
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

const Prefix = mongoose.model("Prefix", prefixSchema);
export default Prefix;
