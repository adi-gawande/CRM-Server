import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "client",
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProductCategory",
    },
    serviceType: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfInstallation: {
      type: Date,
      required: true,
    },
    serviceExpiryDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    priorityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Priority",
    },
    assignedTo: {
      type: String,
      required: true,
      trim: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;