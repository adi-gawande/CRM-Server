import express from "express";
import {
  createLedger,
  getAllLedgers,
  getLedgerById,
  updateLedger,
  deleteLedger,
} from "./controller.js";

const router = express.Router();

router.post("/", createLedger);
router.get("/", getAllLedgers);
router.get("/:id", getLedgerById);
router.put("/:id", updateLedger);
router.delete("/:id", deleteLedger);

export default router;
