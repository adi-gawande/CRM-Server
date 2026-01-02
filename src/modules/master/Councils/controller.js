import Council from "./model.js";

// ✅ Create Council
export const createCouncil = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Council name is required" });
    }

    const existing = await Council.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Council already exists" });
    }

    const council = new Council({ name });
    await council.save();

    res.status(201).json({
      message: "Council created successfully",
      council,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Councils (non-deleted)
export const getCouncils = async (req, res) => {
  try {
    const councils = await Council.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(councils);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Council
export const updateCouncil = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const council = await Council.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!council) {
      return res.status(404).json({ message: "Council not found" });
    }

    res.status(200).json({
      message: "Council updated successfully",
      council,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Council
export const deleteCouncil = async (req, res) => {
  try {
    const { id } = req.params;

    const council = await Council.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!council) {
      return res.status(404).json({ message: "Council not found" });
    }

    res.status(200).json({
      message: "Council deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
