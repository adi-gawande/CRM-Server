import PaymentMode from "./model.js";

// Create
export const createPaymentMode = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Payment mode name is required" });
    }

    const created = await PaymentMode.create({ name });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all
export const getAllPaymentModes = async (req, res) => {
  try {
    const data = await PaymentMode.find({ deleted: false }).sort({
      createdAt: -1,
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
export const updatePaymentMode = async (req, res) => {
  try {
    const { name } = req.body;

    const updated = await PaymentMode.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Soft delete
export const deletePaymentMode = async (req, res) => {
  try {
    await PaymentMode.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
