import mongoose from "mongoose";

const gstPercentageSchema = new mongoose.Schema(
  {
    gstPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const GstPercentage = mongoose.model("GstPercentage", gstPercentageSchema);
export default GstPercentage;