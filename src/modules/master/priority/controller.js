import Priority from "./model.js";

// ✅ Create Priority
export const createPriority = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Priority name is required" });
    }

    const existing = await Priority.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Priority already exists" });
    }

    const priority = new Priority({ name });
    await priority.save();

    res
      .status(201)
      .json({ message: "Priority created successfully", priority });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Prioritys (non-deleted)
export const getPrioritys = async (req, res) => {
  try {
    const prioritys = await Priority.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(prioritys);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Priority
export const updatePriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const priority = await Priority.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!priority) {
      return res.status(404).json({ message: "Priority not found" });
    }

    res
      .status(200)
      .json({ message: "Priority updated successfully", priority });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Priority
export const deletePriority = async (req, res) => {
  try {
    const { id } = req.params;

    const priority = await Priority.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!priority) {
      return res.status(404).json({ message: "Priority not found" });
    }

    res.status(200).json({ message: "Priority deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
