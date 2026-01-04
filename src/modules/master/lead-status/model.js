import mongoose from "mongoose";

const leadStatusSchema = new mongoose.Schema(
  {
    leadStatus: {
      type: String,
      required: true,
      trim: true,
    },
    shortForm: {
      type: String,
      required: true,
      trim: true,
    },
    colorCode: {
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

const LeadStatus = mongoose.model("LeadStatus", leadStatusSchema);
export default LeadStatus;