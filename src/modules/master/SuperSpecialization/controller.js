import SuperSpecialization from "./model.js";

// ✅ Create Super Specialization
export const createSuperSpecialization = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Super Specialization name is required" });
    }

    const existing = await SuperSpecialization.findOne({
      name,
      deleted: false,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Super Specialization already exists" });
    }

    const specialization = new SuperSpecialization({ name });
    await specialization.save();

    res.status(201).json({
      message: "Super Specialization created successfully",
      specialization,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Super Specializations (non-deleted)
export const getSuperSpecializations = async (req, res) => {
  try {
    const list = await SuperSpecialization.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Super Specialization
export const updateSuperSpecialization = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await SuperSpecialization.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Super Specialization not found" });
    }

    res.status(200).json({
      message: "Super Specialization updated successfully",
      specialization: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Super Specialization
export const deleteSuperSpecialization = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await SuperSpecialization.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!deletedItem) {
      return res
        .status(404)
        .json({ message: "Super Specialization not found" });
    }

    res.status(200).json({
      message: "Super Specialization deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
