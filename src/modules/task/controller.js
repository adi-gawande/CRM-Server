import Task from "./model.js";

/**
 * CREATE TASK
 */
export const createTask = async (req, res) => {
  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
};

/**
 * GET ALL TASKS
 */
export const getAllTasks = async (req, res) => {
  const filter = {};

  if (req.query.companyId) {
    filter.companyId = req.query.companyId;
  }

  const tasks = await Task.find(filter)
    .populate("priority")
    .populate("status")
    .populate("assignedTo")
    .populate("clientName")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
};

/**
 * GET TASK BY ID
 */
export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
};

/**
 * UPDATE TASK
 */
export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
};

/**
 * DELETE TASK
 */
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};
