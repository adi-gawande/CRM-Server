import mongoose from "mongoose";

const subLedgerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    ledger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ledger",
      required: true,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SubLedger = mongoose.model("SubLedger", subLedgerSchema);
export default SubLedger;
