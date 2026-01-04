import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ClientName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    PhoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    AlternativePhoneNumber: {
      type: String,
      trim: true,
    },

    AlternativeEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    EmergencyContactPerson: {
      type: String,
      trim: true,
    },

    EmergencyContactNumber: {
      type: String,
      trim: true,
    },

    OfficeAddress: {
      type: String,
      trim: true,
    },

    City: {
      type: String,
      trim: true,
    },

    State: {
      type: String,
      trim: true,
    },

    Country: {
      type: String,
      trim: true,
    },

    Pincode: {
      type: String,
      trim: true,
    },

    GSTNumber: {
      type: String,
      trim: true,
    },

    PanNumber: {
      type: String,
      trim: true,
    },

    Website: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lead = mongoose.model("lead", leadSchema);

export default lead;
