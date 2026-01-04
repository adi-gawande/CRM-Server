import express from "express";
import {
  createGstPercentage,
  getGstPercentages,
  updateGstPercentage,
  deleteGstPercentage,
} from "./controller.js";

const router = express.Router();

router.post("/", createGstPercentage);
router.get("/", getGstPercentages);
router.put("/:id", updateGstPercentage);
router.delete("/:id", deleteGstPercentage);

export default router;