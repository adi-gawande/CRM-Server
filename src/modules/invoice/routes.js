import express from "express";
import { createInvoice, getInvoices, getInvoiceById } from "./controller.js";

const router = express.Router();

// POST /invoice -> create invoice
router.post("/", createInvoice);

// GET /invoice?companyId=xxx -> get all invoices for a company
router.get("/", getInvoices);

// GET /invoice/:id -> get single invoice
router.get("/:id", getInvoiceById);

export default router;
