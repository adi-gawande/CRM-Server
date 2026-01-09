import express from "express";
import {
  createSubProductCategory,
  getSubProductCategories,
  updateSubProductCategory,
  deleteSubProductCategory,
  getProductsSubProductCategories,
} from "./controller.js";

const router = express.Router();

router.post("/", createSubProductCategory);
router.get("/", getSubProductCategories);
router.get("/:productId", getProductsSubProductCategories);
router.put("/:id", updateSubProductCategory);
router.delete("/:id", deleteSubProductCategory);

export default router;
