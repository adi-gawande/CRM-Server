import mongoose from "mongoose";

const diplomaSchema = new mongoose.Schema(
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

const Diploma = mongoose.model("Diploma", diplomaSchema);
export default Diploma;
