import Prefix from "./model.js";

// ✅ Create Prefix
export const createPrefix = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Prefix name is required" });
    }

    const existing = await Prefix.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Prefix already exists" });
    }

    const prefix = new Prefix({ name });
    await prefix.save();

    res.status(201).json({ message: "Prefix created successfully", prefix });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Prefixes (non-deleted)
export const getPrefixes = async (req, res) => {
  try {
    const prefixes = await Prefix.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(prefixes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Prefix
export const updatePrefix = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const prefix = await Prefix.findByIdAndUpdate(id, { name }, { new: true });

    if (!prefix) {
      return res.status(404).json({ message: "Prefix not found" });
    }

    res.status(200).json({ message: "Prefix updated successfully", prefix });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Prefix
export const deletePrefix = async (req, res) => {
  try {
    const { id } = req.params;
    const prefix = await Prefix.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!prefix) {
      return res.status(404).json({ message: "Prefix not found" });
    }

    res.status(200).json({ message: "Prefix deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
