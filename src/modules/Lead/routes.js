import express from "express";
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "./controller.js";

const router = express.Router();

router.post("/", createLead); // Create
router.get("/", getAllLeads); // Get all
router.get("/:id", getLeadById); // Get by ID
router.put("/:id", updateLead); // Update
router.delete("/:id", deleteLead); // Delete

export default router;
