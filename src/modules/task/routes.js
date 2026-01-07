import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "./controller.js";

const router = express.Router();

router.post("/", createTask); // Create
router.get("/", getAllTasks); // Get all
router.get("/:id", getTaskById); // Get by ID
router.put("/:id", updateTask); // Update
router.delete("/:id", deleteTask); // Delete

export default router;
