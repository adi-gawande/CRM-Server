import express from "express";
import {
  createDesignation,
  getDesignations,
  updateDesignation,
  deleteDesignation,
} from "./controller.js";

const router = express.Router();

router.post("/", createDesignation); // Create
router.get("/", getDesignations); // Read
router.put("/:id", updateDesignation); // Update
router.delete("/:id", deleteDesignation); // Soft Delete

export default router;