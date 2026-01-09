import Invoice from "./model.js";

// CREATE INVOICE
export const createInvoice = async (req, res) => {
  try {
    const {
      companyId,
      invoiceNumber,
      clientId,
      invoiceDate,
      items,
      discountType,
      discountValue,
      gstType,
      igst,
      cgst,
      sgst,
      subTotal,
      gstAmount,
      grandTotal,
      bankId,
      notes,
    } = req.body;

    const invoice = new Invoice({
      companyId,
      invoiceNumber,
      clientId,
      invoiceDate,
      items,
      discountType,
      discountValue,
      gstType,
      igst,
      cgst,
      sgst,
      subTotal,
      gstAmount,
      grandTotal,
      bankId,
      notes,
    });

    await invoice.save();
    res.status(201).json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL INVOICES FOR A COMPANY
export const getInvoices = async (req, res) => {
  try {
    const { companyId } = req.query;
    const invoices = await Invoice.find({ companyId })
      .populate("clientId")
      .populate("items.product")
      .populate("items.subProduct")
      .populate("bankId")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: invoices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET SINGLE INVOICE
export const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id)
      .populate("clientId")
      .populate("items.product")
      .populate("items.subProduct")
      .populate("bankId");
    if (!invoice)
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    res.status(200).json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
