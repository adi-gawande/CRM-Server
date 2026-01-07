import mongoose from "mongoose";

const taskStatusSchema = new mongoose.Schema(
  {
    taskStatus: {
      type: String,
      required: true,
      trim: true,
    },
    shortForm: {
      type: String,
      required: true,
      trim: true,
    },
    colorCode: {
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

const TaskStatus = mongoose.model("TaskStatus", taskStatusSchema);
export default TaskStatus;
