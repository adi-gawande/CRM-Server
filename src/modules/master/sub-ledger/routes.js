import express from "express";
import {
  createSubLedger,
  getAllSubLedgers,
  updateSubLedger,
  deleteSubLedger,
} from "./controller.js";

const router = express.Router();

router.post("/", createSubLedger);
router.get("/", getAllSubLedgers);
router.put("/:id", updateSubLedger);
router.delete("/:id", deleteSubLedger);

export default router;
