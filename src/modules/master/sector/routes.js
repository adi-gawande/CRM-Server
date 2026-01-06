import express from "express";
import {
  createSector,
  getSectors,
  updateSector,
  deleteSector,
} from "./controller.js";

const router = express.Router();

router.post("/", createSector); // Create
router.get("/", getSectors); // Read
router.put("/:id", updateSector); // Update
router.delete("/:id", deleteSector); // Soft Delete

export default router;
