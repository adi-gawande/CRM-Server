import Lead from "./model.js";

/**
 * CREATE CLIENT
 */
export const createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  res.status(201).json({
    success: true,
    data: lead,
  });
};

/**
 * GET ALL CLIENTS
 */
export const getAllLeads = async (req, res) => {
  const leads = await Lead.find()
    .populate("leadReferenceId", "leadReference") // only required fields
    .populate("leadStatusId", "leadStatus")
    .populate("leadTypeId", "leadType")
    .populate("leadSourceId", "leadSource")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: leads.length,
    data: leads,
  });
};

/**
 * GET CLIENT BY ID
 */
export const getLeadById = async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  res.status(200).json({
    success: true,
    data: lead,
  });
};

/**
 * UPDATE CLIENT
 */
export const updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  res.status(200).json({
    success: true,
    data: lead,
  });
};

/**
 * DELETE CLIENT
 */
export const deleteLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  await lead.deleteOne();

  res.status(200).json({
    success: true,
    message: "Lead deleted successfully",
  });
};
