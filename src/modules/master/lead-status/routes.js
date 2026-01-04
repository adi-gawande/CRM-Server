import express from "express";
import {
  createLeadStatus,
  getLeadStatuses,
  updateLeadStatus,
  deleteLeadStatus,
} from "./controller.js";

const router = express.Router();

router.post("/", createLeadStatus);
router.get("/", getLeadStatuses);
router.put("/:id", updateLeadStatus);
router.delete("/:id", deleteLeadStatus);

export default router;