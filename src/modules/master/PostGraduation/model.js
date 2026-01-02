import mongoose from "mongoose";

const postGraduationSchema = new mongoose.Schema(
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

const PostGraduation = mongoose.model("PostGraduation", postGraduationSchema);

export default PostGraduation;
