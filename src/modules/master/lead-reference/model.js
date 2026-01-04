import mongoose from "mongoose";

const leadReferenceSchema = new mongoose.Schema(
  {
    leadReference: {
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

const LeadReference = mongoose.model("LeadReference", leadReferenceSchema);
export default LeadReference;