import LeadSource from "./model.js";

export const createLeadSource = async (req, res) => {
  try {
    const { leadSource, companyId } = req.body;

    if (!leadSource) {
      return res.status(400).json({ message: "Lead type is required" });
    }

    if (!companyId || typeof companyId !== "string") {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedData = {
      leadSource: String(leadSource).trim(),
      companyId: String(companyId).trim(),
    };

    // Check for duplicate lead type within the same company
    const existing = await LeadSource.findOne({
      leadSource: sanitizedData.leadSource,
      companyId: sanitizedData.companyId,
      deleted: false,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Lead type already exists for this company" });
    }

    const leadSourceDoc = new LeadSource(sanitizedData);
    await leadSourceDoc.save();

    res
      .status(201)
      .json({
        message: "Lead type created successfully",
        leadSource: leadSourceDoc,
      });
  } catch (error) {
    console.error("Create lead type error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getLeadSources = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== "string") {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const leadSources = await LeadSource.find({
      companyId: sanitizedCompanyId,
      deleted: false,
    }).sort({
      leadSource: 1,
    });

    res.status(200).json(leadSources);
  } catch (error) {
    console.error("Get lead types error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const updateLeadSource = async (req, res) => {
  try {
    const { id } = req.params;
    const { leadSource, companyId } = req.body;

    if (!companyId || typeof companyId !== "string") {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedData = {
      leadSource: leadSource ? String(leadSource).trim() : undefined,
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    // Check for duplicate lead type (excluding current record)
    if (sanitizedData.leadSource) {
      const existing = await LeadSource.findOne({
        leadSource: sanitizedData.leadSource,
        companyId: sanitizedCompanyId,
        deleted: false,
        _id: { $ne: sanitizedId },
      });

      if (existing) {
        return res
          .status(400)
          .json({ message: "Lead type already exists for this company" });
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const leadSourceDoc = await LeadSource.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    );

    if (!leadSourceDoc) {
      return res.status(404).json({ message: "Lead type not found" });
    }

    res
      .status(200)
      .json({
        message: "Lead type updated successfully",
        leadSource: leadSourceDoc,
      });
  } catch (error) {
    console.error("Update lead type error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const deleteLeadSource = async (req, res) => {
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

    const leadSourceDoc = await LeadSource.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!leadSourceDoc) {
      return res.status(404).json({ message: "Lead type not found" });
    }

    res.status(200).json({ message: "Lead type deleted successfully" });
  } catch (error) {
    console.error("Delete lead type error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};
