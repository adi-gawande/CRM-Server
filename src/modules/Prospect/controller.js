import Prospect from "./model.js";

/**
 * CREATE CLIENT
 */
export const createProspect = async (req, res) => {
  const prospect = await Prospect.create(req.body);
  res.status(201).json({
    success: true,
    data: prospect,
  });
};

/**
 * GET ALL CLIENTS
 */
export const getAllProspects = async (req, res) => {
  const prospects = await Prospect.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: prospects.length,
    data: prospects,
  });
};

/**
 * GET CLIENT BY ID
 */
export const getProspectById = async (req, res) => {
  const prospect = await Prospect.findById(req.params.id);

  if (!prospect) {
    return res.status(404).json({
      success: false,
      message: "Prospect not found",
    });
  }

  res.status(200).json({
    success: true,
    data: prospect,
  });
};

/**
 * UPDATE CLIENT
 */
export const updateProspect = async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!prospect) {
    return res.status(404).json({
      success: false,
      message: "Prospect not found",
    });
  }

  res.status(200).json({
    success: true,
    data: prospect,
  });
};

/**
 * DELETE CLIENT
 */
export const deleteProspect = async (req, res) => {
  const prospect = await Prospect.findById(req.params.id);

  if (!prospect) {
    return res.status(404).json({
      success: false,
      message: "Prospect not found",
    });
  }

  await prospect.deleteOne();

  res.status(200).json({
    success: true,
    message: "Prospect deleted successfully",
  });
};
