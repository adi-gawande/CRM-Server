import express from "express";
import {
  createProspect,
  getAllProspects,
  getProspectById,
  updateProspect,
  deleteProspect,
} from "./controller.js";

const router = express.Router();

router.post("/", createProspect); // Create
router.get("/", getAllProspects); // Get all
router.get("/:id", getProspectById); // Get by ID
router.put("/:id", updateProspect); // Update
router.delete("/:id", deleteProspect); // Delete

export default router;
