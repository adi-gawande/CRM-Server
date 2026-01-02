import BillGroup from "./model.js";

/**
 * Generate Bill Group Code
 * Format: 000001
 */
const generateBillGroupCode = async () => {
  const last = await BillGroup.findOne().sort({ createdAt: -1 });

  if (!last) return "000001";

  const next = parseInt(last.code, 10) + 1;
  return next.toString().padStart(6, "0");
};

// CREATE
export const createBillGroup = async (req, res) => {
  try {
    const { name, ledger, subLedger, description, forAllBranch } = req.body;

    if (!name || !ledger || !subLedger) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const code = await generateBillGroupCode();

    const created = await BillGroup.create({
      name,
      code,
      ledger,
      subLedger,
      description,
      forAllBranch,
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getAllBillGroups = async (req, res) => {
  try {
    const data = await BillGroup.find({ deleted: false })
      .populate("ledger", "name ledgerType")
      .populate("subLedger", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateBillGroup = async (req, res) => {
  try {
    const { name, ledger, subLedger, description, forAllBranch } = req.body;

    const updated = await BillGroup.findByIdAndUpdate(
      req.params.id,
      {
        name,
        ledger,
        subLedger,
        description,
        forAllBranch,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SOFT DELETE
export const deleteBillGroup = async (req, res) => {
  try {
    await BillGroup.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
