import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./controller.js";

const userRoutes = express.Router();

/**
 * CREATE
 */
userRoutes.post("/", createUser);

/**
 * READ
 */
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);

/**
 * UPDATE
 */
userRoutes.put("/:id", updateUser);

/**
 * DELETE (SOFT)
 */
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
