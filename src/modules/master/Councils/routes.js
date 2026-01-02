import express from "express";
import {
  createCouncil,
  getCouncils,
  updateCouncil,
  deleteCouncil,
} from "./controller.js";

const router = express.Router();

router.post("/", createCouncil); // Create
router.get("/", getCouncils); // Read
router.put("/:id", updateCouncil); // Update
router.delete("/:id", deleteCouncil); // Soft Delete

export default router;
