import express from "express";
import {
  createTaskStatus,
  getTaskStatuses,
  updateTaskStatus,
  deleteTaskStatus,
} from "./controller.js";

const router = express.Router();

router.post("/", createTaskStatus);
router.get("/", getTaskStatuses);
router.put("/:id", updateTaskStatus);
router.delete("/:id", deleteTaskStatus);

export default router;
