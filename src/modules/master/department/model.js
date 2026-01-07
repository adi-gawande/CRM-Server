import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
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

const Department = mongoose.model("Department", departmentSchema);
export default Department;