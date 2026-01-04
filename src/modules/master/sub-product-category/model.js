import mongoose from "mongoose";

const subProductCategorySchema = new mongoose.Schema(
  {
    productCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProductCategory",
    },
    subProductName: {
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

const SubProductCategory = mongoose.model("SubProductCategory", subProductCategorySchema);
export default SubProductCategory;