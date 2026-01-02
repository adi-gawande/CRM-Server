import Diploma from "./model.js";

// ✅ Create Diploma
export const createDiploma = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Diploma name is required" });
    }

    const existing = await Diploma.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Diploma already exists" });
    }

    const diploma = new Diploma({ name });
    await diploma.save();

    res.status(201).json({ message: "Diploma created successfully", diploma });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Diplomas (non-deleted)
export const getDiplomas = async (req, res) => {
  try {
    const diplomas = await Diploma.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(diplomas);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Diploma
export const updateDiploma = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const diploma = await Diploma.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!diploma) {
      return res.status(404).json({ message: "Diploma not found" });
    }

    res.status(200).json({ message: "Diploma updated successfully", diploma });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Diploma
export const deleteDiploma = async (req, res) => {
  try {
    const { id } = req.params;

    const diploma = await Diploma.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!diploma) {
      return res.status(404).json({ message: "Diploma not found" });
    }

    res.status(200).json({ message: "Diploma deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
