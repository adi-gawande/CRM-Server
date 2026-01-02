import Graduation from "./model.js";

// ✅ Create Graduation
export const createGraduation = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Graduation name is required" });
    }

    const existing = await Graduation.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Graduation already exists" });
    }

    const graduation = new Graduation({ name });
    await graduation.save();

    res
      .status(201)
      .json({ message: "Graduation created successfully", graduation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Graduations (non-deleted)
export const getGraduations = async (req, res) => {
  try {
    const graduations = await Graduation.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(graduations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Graduation
export const updateGraduation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const graduation = await Graduation.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!graduation) {
      return res.status(404).json({ message: "Graduation not found" });
    }

    res
      .status(200)
      .json({ message: "Graduation updated successfully", graduation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Graduation
export const deleteGraduation = async (req, res) => {
  try {
    const { id } = req.params;

    const graduation = await Graduation.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!graduation) {
      return res.status(404).json({ message: "Graduation not found" });
    }

    res.status(200).json({ message: "Graduation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
