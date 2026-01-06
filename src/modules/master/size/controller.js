import Size from "./model.js";

// ✅ Create Size
export const createSize = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Size name is required" });
    }

    const existing = await Size.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Size already exists" });
    }

    const size = new Size({ name });
    await size.save();

    res.status(201).json({ message: "Size created successfully", size });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Sizes (non-deleted)
export const getSizes = async (req, res) => {
  try {
    const sizes = await Size.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(sizes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Size
export const updateSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const size = await Size.findByIdAndUpdate(id, { name }, { new: true });

    if (!size) {
      return res.status(404).json({ message: "Size not found" });
    }

    res.status(200).json({ message: "Size updated successfully", size });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Size
export const deleteSize = async (req, res) => {
  try {
    const { id } = req.params;

    const size = await Size.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!size) {
      return res.status(404).json({ message: "Size not found" });
    }

    res.status(200).json({ message: "Size deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
