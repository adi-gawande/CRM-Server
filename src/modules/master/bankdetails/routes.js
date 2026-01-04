import express from "express";
import {
  createBankDetails,
  getBankDetails,
  updateBankDetails,
  deleteBankDetails,
} from "./controller.js";

const router = express.Router();

router.post("/", createBankDetails); // Create
router.get("/", getBankDetails); // Read
router.put("/:id", updateBankDetails); // Update
router.delete("/:id", deleteBankDetails); // Soft Delete

export default router;