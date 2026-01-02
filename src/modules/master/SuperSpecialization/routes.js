import express from "express";
import {
  createSuperSpecialization,
  getSuperSpecializations,
  updateSuperSpecialization,
  deleteSuperSpecialization,
} from "./controller.js";

const router = express.Router();

router.post("/", createSuperSpecialization); // Create
router.get("/", getSuperSpecializations); // Read
router.put("/:id", updateSuperSpecialization); // Update
router.delete("/:id", deleteSuperSpecialization); // Soft Delete

export default router;
