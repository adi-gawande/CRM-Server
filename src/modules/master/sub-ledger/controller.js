import SubLedger from "./model.js";

export const createSubLedger = async (req, res) => {
  try {
    const { name, ledger } = req.body;

    if (!name || !ledger) {
      return res.status(400).json({
        success: false,
        message: "SubLedger name and Ledger are required",
      });
    }

    const subLedger = await SubLedger.create({ name, ledger });

    res.status(201).json({ success: true, data: subLedger });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllSubLedgers = async (req, res) => {
  try {
    const data = await SubLedger.find({ deleted: false })
      .populate("ledger", "name ledgerType")
      .sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSubLedger = async (req, res) => {
  try {
    const { name, ledger } = req.body;

    const updated = await SubLedger.findByIdAndUpdate(
      req.params.id,
      { name, ledger },
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSubLedger = async (req, res) => {
  try {
    await SubLedger.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
