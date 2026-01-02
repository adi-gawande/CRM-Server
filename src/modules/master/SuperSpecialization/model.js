import mongoose from "mongoose";

const superSpecializationSchema = new mongoose.Schema(
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

const SuperSpecialization = mongoose.model(
  "SuperSpecialization",
  superSpecializationSchema
);

export default SuperSpecialization;
