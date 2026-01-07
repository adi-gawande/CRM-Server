import express from "express";
import {
  createPriority,
  getPrioritys,
  updatePriority,
  deletePriority,
} from "./controller.js";

const router = express.Router();

router.post("/", createPriority); // Create
router.get("/", getPrioritys); // Read
router.put("/:id", updatePriority); // Update
router.delete("/:id", deletePriority); // Soft Delete

export default router;
