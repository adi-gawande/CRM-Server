import LeadStatus from "./model.js";

export const createLeadStatus = async (req, res) => {
  try {
    const { leadStatus, shortForm, colorCode, companyId } = req.body;

    if (!leadStatus || !shortForm || !colorCode) {
      return res.status(400).json({ message: "Lead status, short form, and color code are required" });
    }

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedData = {
      leadStatus: String(leadStatus).trim(),
      shortForm: String(shortForm).trim(),
      colorCode: String(colorCode).trim(),
      companyId: String(companyId).trim()
    };

    // Check for duplicate lead status within the same company
    const existing = await LeadStatus.findOne({ 
      leadStatus: sanitizedData.leadStatus, 
      companyId: sanitizedData.companyId, 
      deleted: false 
    });
    
    if (existing) {
      return res.status(400).json({ message: "Lead status already exists for this company" });
    }

    const leadStatusDoc = new LeadStatus(sanitizedData);
    await leadStatusDoc.save();

    res.status(201).json({ message: "Lead status created successfully", leadStatus: leadStatusDoc });
  } catch (error) {
    console.error('Create lead status error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getLeadStatuses = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const leadStatuses = await LeadStatus.find({ 
      companyId: sanitizedCompanyId, 
      deleted: false 
    }).sort({
      leadStatus: 1,
    });
    
    res.status(200).json(leadStatuses);
  } catch (error) {
    console.error('Get lead statuses error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { leadStatus, shortForm, colorCode, companyId } = req.body;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedData = {
      leadStatus: leadStatus ? String(leadStatus).trim() : undefined,
      shortForm: shortForm ? String(shortForm).trim() : undefined,
      colorCode: colorCode ? String(colorCode).trim() : undefined
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    // Check for duplicate lead status (excluding current record)
    if (sanitizedData.leadStatus) {
      const existing = await LeadStatus.findOne({ 
        leadStatus: sanitizedData.leadStatus, 
        companyId: sanitizedCompanyId, 
        deleted: false,
        _id: { $ne: sanitizedId }
      });
      
      if (existing) {
        return res.status(400).json({ message: "Lead status already exists for this company" });
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const leadStatusDoc = await LeadStatus.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    );

    if (!leadStatusDoc) {
      return res.status(404).json({ message: "Lead status not found" });
    }

    res.status(200).json({ message: "Lead status updated successfully", leadStatus: leadStatusDoc });
  } catch (error) {
    console.error('Update lead status error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const deleteLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyId } = req.body;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    const leadStatusDoc = await LeadStatus.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!leadStatusDoc) {
      return res.status(404).json({ message: "Lead status not found" });
    }

    res.status(200).json({ message: "Lead status deleted successfully" });
  } catch (error) {
    console.error('Delete lead status error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};