import express from "express";
import {
  createDiploma,
  getDiplomas,
  updateDiploma,
  deleteDiploma,
} from "./controller.js";

const router = express.Router();

router.post("/", createDiploma); // Create
router.get("/", getDiplomas); // Read
router.put("/:id", updateDiploma); // Update
router.delete("/:id", deleteDiploma); // Soft Delete

export default router;
