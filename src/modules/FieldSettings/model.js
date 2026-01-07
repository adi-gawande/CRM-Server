import mongoose from "mongoose";

const fieldSettingsSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    formType: {
      type: String,
      required: true,
      enum: ["prospect", "lead", "client"],
    },
    fieldSettings: {
      OfficeAddress: { type: Boolean, default: true },
      City: { type: Boolean, default: true },
      State: { type: Boolean, default: true },
      Country: { type: Boolean, default: true },
      Pincode: { type: Boolean, default: true },
      GSTNumber: { type: Boolean, default: true },
      PanNumber: { type: Boolean, default: true },
      Website: { type: Boolean, default: true },
      leadTypeId: { type: Boolean, default: true },
      leadSourceId: { type: Boolean, default: true },
      leadReferenceId: { type: Boolean, default: true },
      leadStatusId: { type: Boolean, default: true },
      AlternativePhoneNumber: { type: Boolean, default: true },
      AlternativeEmail: { type: Boolean, default: true },
      EmergencyContactPerson: { type: Boolean, default: true },
      EmergencyContactNumber: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

fieldSettingsSchema.index({ companyId: 1, formType: 1 }, { unique: true });

const FieldSettings = mongoose.model("FieldSettings", fieldSettingsSchema);

export default FieldSettings;