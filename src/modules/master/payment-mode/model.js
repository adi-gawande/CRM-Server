import mongoose from "mongoose";

const paymentModeSchema = new mongoose.Schema(
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

const PaymentMode = mongoose.model("PaymentMode", paymentModeSchema);
export default PaymentMode;
