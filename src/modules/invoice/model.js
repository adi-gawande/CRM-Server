import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true,
  },
  subProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubProductCategory",
  },
  description: { type: String },
  qty: { type: Number, required: true, default: 1 },
  rate: { type: Number, required: true, default: 0 },
  amount: { type: Number, required: true, default: 0 },
});

const invoiceSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    invoiceNumber: { type: String, required: true },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
      required: true,
    },
    invoiceDate: { type: Date, required: true },
    items: [invoiceItemSchema],

    discountType: {
      type: String,
      enum: ["none", "amount", "percent"],
      default: "none",
    },
    discountValue: { type: Number, default: 0 },

    gstType: {
      type: String,
      enum: ["nogst", "igst", "sgstcgst"],
      default: "nogst",
    },
    igst: { type: Number, default: 0 },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },

    subTotal: { type: Number, required: true, default: 0 },
    gstAmount: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true, default: 0 },

    bankId: { type: mongoose.Schema.Types.ObjectId, ref: "BankDetails" },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", invoiceSchema);
