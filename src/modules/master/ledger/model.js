import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    ledgerType: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Ledger = mongoose.model("Ledger", ledgerSchema);
export default Ledger;
