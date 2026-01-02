import express from "express";
import {
  createBillGroup,
  getAllBillGroups,
  updateBillGroup,
  deleteBillGroup,
} from "./controller.js";

const router = express.Router();

router.post("/", createBillGroup);
router.get("/", getAllBillGroups);
router.put("/:id", updateBillGroup);
router.delete("/:id", deleteBillGroup);

export default router;
