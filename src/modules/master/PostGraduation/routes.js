import express from "express";
import {
  createPostGraduation,
  getPostGraduations,
  updatePostGraduation,
  deletePostGraduation,
} from "./controller.js";

const router = express.Router();

router.post("/", createPostGraduation); // Create
router.get("/", getPostGraduations); // Read
router.put("/:id", updatePostGraduation); // Update
router.delete("/:id", deletePostGraduation); // Soft Delete

export default router;
