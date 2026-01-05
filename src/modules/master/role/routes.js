import express from "express";
import { createRole, getRoles, updateRole, deleteRole } from "./controller.js";

const router = express.Router();

router.post("/", createRole); // Create
router.get("/", getRoles); // Read
router.put("/:id", updateRole); // Update
router.delete("/:id", deleteRole); // Soft Delete

export default router;
