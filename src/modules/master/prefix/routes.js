import express from "express";
import {
  createPrefix,
  getPrefixes,
  updatePrefix,
  deletePrefix,
} from "./controller.js";

const router = express.Router();

router.post("/", createPrefix); // Create
router.get("/", getPrefixes); // Read
router.put("/:id", updatePrefix); // Update
router.delete("/:id", deletePrefix); // Soft Delete

export default router;
