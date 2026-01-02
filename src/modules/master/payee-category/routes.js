import express from "express";
import {
  createPayeeCategory,
  getAllPayeeCategories,
  updatePayeeCategory,
  deletePayeeCategory,
} from "./controller.js";

const router = express.Router();

router.post("/", createPayeeCategory);
router.get("/", getAllPayeeCategories);
router.put("/:id", updatePayeeCategory);
router.delete("/:id", deletePayeeCategory);

export default router;
