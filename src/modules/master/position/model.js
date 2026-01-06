import mongoose from "mongoose";

const positionSchema = new mongoose.Schema(
  {
    positionName: {
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

const Position = mongoose.model("Position", positionSchema);
export default Position;