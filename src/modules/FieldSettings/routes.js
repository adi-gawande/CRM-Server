import express from "express";
import { getFieldSettings, updateFieldSettings } from "./controller.js";

const router = express.Router();

router.get("/", getFieldSettings);
router.put("/", updateFieldSettings);

export default router;