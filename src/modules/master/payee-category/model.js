import mongoose from "mongoose";

const payeeCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PayeeCategory = mongoose.model("PayeeCategory", payeeCategorySchema);
export default PayeeCategory;
