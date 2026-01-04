import mongoose from "mongoose";

const leadTypeSchema = new mongoose.Schema(
  {
    leadType: {
      type: String,
      required: true,
      trim: true,
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

const LeadType = mongoose.model("LeadType", leadTypeSchema);
export default LeadType;