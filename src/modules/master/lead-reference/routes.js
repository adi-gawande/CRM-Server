import express from "express";
import {
  createLeadReference,
  getLeadReferences,
  updateLeadReference,
  deleteLeadReference,
} from "./controller.js";

const router = express.Router();

router.post("/", createLeadReference);
router.get("/", getLeadReferences);
router.put("/:id", updateLeadReference);
router.delete("/:id", deleteLeadReference);

export default router;