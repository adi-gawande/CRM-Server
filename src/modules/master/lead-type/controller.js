import LeadType from "./model.js";

export const createLeadType = async (req, res) => {
  try {
    const { leadType, companyId } = req.body;

    if (!leadType) {
      return res.status(400).json({ message: "Lead type is required" });
    }

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedData = {
      leadType: String(leadType).trim(),
      companyId: String(companyId).trim()
    };

    // Check for duplicate lead type within the same company
    const existing = await LeadType.findOne({ 
      leadType: sanitizedData.leadType, 
      companyId: sanitizedData.companyId, 
      deleted: false 
    });
    
    if (existing) {
      return res.status(400).json({ message: "Lead type already exists for this company" });
    }

    const leadTypeDoc = new LeadType(sanitizedData);
    await leadTypeDoc.save();

    res.status(201).json({ message: "Lead type created successfully", leadType: leadTypeDoc });
  } catch (error) {
    console.error('Create lead type error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getLeadTypes = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const leadTypes = await LeadType.find({ 
      companyId: sanitizedCompanyId, 
      deleted: false 
    }).sort({
      leadType: 1,
    });
    
    res.status(200).json(leadTypes);
  } catch (error) {
    console.error('Get lead types error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const updateLeadType = async (req, res) => {
  try {
    const { id } = req.params;
    const { leadType, companyId } = req.body;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedData = {
      leadType: leadType ? String(leadType).trim() : undefined
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    // Check for duplicate lead type (excluding current record)
    if (sanitizedData.leadType) {
      const existing = await LeadType.findOne({ 
        leadType: sanitizedData.leadType, 
        companyId: sanitizedCompanyId, 
        deleted: false,
        _id: { $ne: sanitizedId }
      });
      
      if (existing) {
        return res.status(400).json({ message: "Lead type already exists for this company" });
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const leadTypeDoc = await LeadType.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    );

    if (!leadTypeDoc) {
      return res.status(404).json({ message: "Lead type not found" });
    }

    res.status(200).json({ message: "Lead type updated successfully", leadType: leadTypeDoc });
  } catch (error) {
    console.error('Update lead type error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const deleteLeadType = async (req, res) => {
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

    const leadTypeDoc = await LeadType.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!leadTypeDoc) {
      return res.status(404).json({ message: "Lead type not found" });
    }

    res.status(200).json({ message: "Lead type deleted successfully" });
  } catch (error) {
    console.error('Delete lead type error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};