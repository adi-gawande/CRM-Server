import mongoose from "mongoose";

const bankDetailsSchema = new mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    ifsc: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      validate: {
        validator: function(v) {
          return /^[A-Z]{4}[A-Z0-9]{7}$/.test(v);
        },
        message: 'IFSC code must be 11 characters: 4 letters followed by 7 alphanumeric characters'
      }
    },
    upi: {
      type: String,
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

const BankDetails = mongoose.model("BankDetails", bankDetailsSchema);
export default BankDetails;