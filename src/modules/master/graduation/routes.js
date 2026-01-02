import express from "express";
import {
  createGraduation,
  getGraduations,
  updateGraduation,
  deleteGraduation,
} from "./controller.js";

const router = express.Router();

router.post("/", createGraduation); // Create
router.get("/", getGraduations); // Read
router.put("/:id", updateGraduation); // Update
router.delete("/:id", deleteGraduation); // Soft Delete

export default router;
