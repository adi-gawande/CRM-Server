import express from "express";
import {
  createLeadType,
  getLeadTypes,
  updateLeadType,
  deleteLeadType,
} from "./controller.js";

const router = express.Router();

router.post("/", createLeadType);
router.get("/", getLeadTypes);
router.put("/:id", updateLeadType);
router.delete("/:id", deleteLeadType);

export default router;