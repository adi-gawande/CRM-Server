import express from "express";
import { createSize, getSizes, updateSize, deleteSize } from "./controller.js";

const router = express.Router();

router.post("/", createSize); // Create
router.get("/", getSizes); // Read
router.put("/:id", updateSize); // Update
router.delete("/:id", deleteSize); // Soft Delete

export default router;
