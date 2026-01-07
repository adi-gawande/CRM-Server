import express from "express";
import {
  createPosition,
  getPositions,
  updatePosition,
  deletePosition,
} from "./controller.js";

const router = express.Router();

router.post("/", createPosition);
router.get("/", getPositions);
router.put("/:id", updatePosition);
router.delete("/:id", deletePosition);

export default router;