import express from "express";
import {
  createSubProductCategory,
  getSubProductCategories,
  updateSubProductCategory,
  deleteSubProductCategory,
} from "./controller.js";

const router = express.Router();

router.post("/", createSubProductCategory);
router.get("/", getSubProductCategories);
router.put("/:id", updateSubProductCategory);
router.delete("/:id", deleteSubProductCategory);

export default router;