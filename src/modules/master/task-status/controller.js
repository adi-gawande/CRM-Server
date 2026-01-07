import TaskStatus from "./model.js";

export const createTaskStatus = async (req, res) => {
  try {
    const { taskStatus, shortForm, colorCode, companyId } = req.body;

    if (!taskStatus || !shortForm || !colorCode) {
      return res
        .status(400)
        .json({
          message: "Task status, short form, and color code are required",
        });
    }

    if (!companyId || typeof companyId !== "string") {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedData = {
      taskStatus: String(taskStatus).trim(),
      shortForm: String(shortForm).trim(),
      colorCode: String(colorCode).trim(),
      companyId: String(companyId).trim(),
    };

    // Check for duplicate task status within the same company
    const existing = await TaskStatus.findOne({
      taskStatus: sanitizedData.taskStatus,
      companyId: sanitizedData.companyId,
      deleted: false,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Task status already exists for this company" });
    }

    const taskStatusDoc = new TaskStatus(sanitizedData);
    await taskStatusDoc.save();

    res
      .status(201)
      .json({
        message: "Task status created successfully",
        taskStatus: taskStatusDoc,
      });
  } catch (error) {
    console.error("Create task status error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getTaskStatuses = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== "string") {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const taskStatuses = await TaskStatus.find({
      companyId: sanitizedCompanyId,
      deleted: false,
    }).sort({
      taskStatus: 1,
    });

    res.status(200).json(taskStatuses);
  } catch (error) {
    console.error("Get task statuses error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskStatus, shortForm, colorCode, companyId } = req.body;

    if (!companyId || typeof companyId !== "string") {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedData = {
      taskStatus: taskStatus ? String(taskStatus).trim() : undefined,
      shortForm: shortForm ? String(shortForm).trim() : undefined,
      colorCode: colorCode ? String(colorCode).trim() : undefined,
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    // Check for duplicate task status (excluding current record)
    if (sanitizedData.taskStatus) {
      const existing = await TaskStatus.findOne({
        taskStatus: sanitizedData.taskStatus,
        companyId: sanitizedCompanyId,
        deleted: false,
        _id: { $ne: sanitizedId },
      });

      if (existing) {
        return res
          .status(400)
          .json({ message: "Task status already exists for this company" });
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const taskStatusDoc = await TaskStatus.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    );

    if (!taskStatusDoc) {
      return res.status(404).json({ message: "Task status not found" });
    }

    res
      .status(200)
      .json({
        message: "Task status updated successfully",
        taskStatus: taskStatusDoc,
      });
  } catch (error) {
    console.error("Update task status error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const deleteTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyId } = req.body;

    if (!companyId || typeof companyId !== "string") {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    const taskStatusDoc = await TaskStatus.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!taskStatusDoc) {
      return res.status(404).json({ message: "Task status not found" });
    }

    res.status(200).json({ message: "Task status deleted successfully" });
  } catch (error) {
    console.error("Delete task status error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};
