import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema(
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

const Sector = mongoose.model("Sector", sectorSchema);
export default Sector;
