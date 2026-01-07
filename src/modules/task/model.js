import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Priority",
      default: null,
    },

    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskStatus",
      default: null,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    clientName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
      default: null,
    },

    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const task = mongoose.model("task", taskSchema);

export default task;
