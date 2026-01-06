import Sector from "./model.js";

// ✅ Create Sector
export const createSector = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Sector name is required" });
    }

    const existing = await Sector.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Sector already exists" });
    }

    const sector = new Sector({ name });
    await sector.save();

    res.status(201).json({ message: "Sector created successfully", sector });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Sectors (non-deleted)
export const getSectors = async (req, res) => {
  try {
    const sectors = await Sector.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(sectors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Sector
export const updateSector = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const sector = await Sector.findByIdAndUpdate(id, { name }, { new: true });

    if (!sector) {
      return res.status(404).json({ message: "Sector not found" });
    }

    res.status(200).json({ message: "Sector updated successfully", sector });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Sector
export const deleteSector = async (req, res) => {
  try {
    const { id } = req.params;

    const sector = await Sector.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!sector) {
      return res.status(404).json({ message: "Sector not found" });
    }

    res.status(200).json({ message: "Sector deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
