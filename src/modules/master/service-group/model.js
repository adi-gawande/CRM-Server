import mongoose from "mongoose";

const billGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
    },

    ledger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ledger",
      required: true,
    },

    subLedger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubLedger",
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    forAllBranch: {
      type: Boolean,
      default: false,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BillGroup = mongoose.model("BillGroup", billGroupSchema);
export default BillGroup;
