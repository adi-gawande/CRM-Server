import express from "express";
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} from "./controller.js";

const router = express.Router();

router.post("/", createClient); // Create
router.get("/", getAllClients); // Get all
router.get("/:id", getClientById); // Get by ID
router.put("/:id", updateClient); // Update
router.delete("/:id", deleteClient); // Delete

export default router;
