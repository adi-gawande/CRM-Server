import express from "express";
import {
  createPaymentMode,
  getAllPaymentModes,
  updatePaymentMode,
  deletePaymentMode,
} from "./controller.js";

const router = express.Router();

router.post("/", createPaymentMode);
router.get("/", getAllPaymentModes);
router.put("/:id", updatePaymentMode);
router.delete("/:id", deletePaymentMode);

export default router;
