import PayeeCategory from "./model.js";

// Create
export const createPayeeCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Payee category name is required",
      });
    }

    const created = await PayeeCategory.create({ name });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all
export const getAllPayeeCategories = async (req, res) => {
  try {
    const data = await PayeeCategory.find({ deleted: false }).sort({
      createdAt: -1,
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
export const updatePayeeCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const updated = await PayeeCategory.findByIdAndUpdate(
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
export const deletePayeeCategory = async (req, res) => {
  try {
    await PayeeCategory.findByIdAndUpdate(req.params.id, {
      deleted: true,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
