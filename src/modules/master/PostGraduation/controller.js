import PostGraduation from "./model.js";

// ✅ Create Post Graduation
export const createPostGraduation = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Post Graduation name is required" });
    }

    const existing = await PostGraduation.findOne({ name, deleted: false });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Post Graduation already exists" });
    }

    const postGraduation = new PostGraduation({ name });
    await postGraduation.save();

    res.status(201).json({
      message: "Post Graduation created successfully",
      postGraduation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Post Graduations (non-deleted)
export const getPostGraduations = async (req, res) => {
  try {
    const list = await PostGraduation.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Post Graduation
export const updatePostGraduation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await PostGraduation.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Post Graduation not found" });
    }

    res.status(200).json({
      message: "Post Graduation updated successfully",
      postGraduation: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Post Graduation
export const deletePostGraduation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await PostGraduation.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!deletedItem) {
      return res.status(404).json({ message: "Post Graduation not found" });
    }

    res.status(200).json({
      message: "Post Graduation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
