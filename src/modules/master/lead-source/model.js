import mongoose from "mongoose";

const leadSourceSchema = new mongoose.Schema(
  {
    leadSource: {
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

const LeadSource = mongoose.model("LeadSource", leadSourceSchema);
export default LeadSource;
