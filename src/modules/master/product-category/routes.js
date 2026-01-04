import express from "express";
import {
  createProductCategory,
  getProductCategories,
  updateProductCategory,
  deleteProductCategory,
} from "./controller.js";

const router = express.Router();

router.post("/", createProductCategory);
router.get("/", getProductCategories);
router.put("/:id", updateProductCategory);
router.delete("/:id", deleteProductCategory);

export default router;