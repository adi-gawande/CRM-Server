import express from "express";
import {
  createLeadSource,
  getLeadSources,
  updateLeadSource,
  deleteLeadSource,
} from "./controller.js";

const router = express.Router();

router.post("/", createLeadSource);
router.get("/", getLeadSources);
router.put("/:id", updateLeadSource);
router.delete("/:id", deleteLeadSource);

export default router;
