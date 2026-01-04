import LeadReference from "./model.js";

export const createLeadReference = async (req, res) => {
  try {
    const { leadReference, companyId } = req.body;

    if (!leadReference) {
      return res.status(400).json({ message: "Lead reference is required" });
    }

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedData = {
      leadReference: String(leadReference).trim(),
      companyId: String(companyId).trim()
    };

    // Check for duplicate lead reference within the same company
    const existing = await LeadReference.findOne({ 
      leadReference: sanitizedData.leadReference, 
      companyId: sanitizedData.companyId, 
      deleted: false 
    });
    
    if (existing) {
      return res.status(400).json({ message: "Lead reference already exists for this company" });
    }

    const leadReferenceDoc = new LeadReference(sanitizedData);
    await leadReferenceDoc.save();

    res.status(201).json({ message: "Lead reference created successfully", leadReference: leadReferenceDoc });
  } catch (error) {
    console.error('Create lead reference error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getLeadReferences = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const leadReferences = await LeadReference.find({ 
      companyId: sanitizedCompanyId, 
      deleted: false 
    }).sort({
      leadReference: 1,
    });
    
    res.status(200).json(leadReferences);
  } catch (error) {
    console.error('Get lead references error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const updateLeadReference = async (req, res) => {
  try {
    const { id } = req.params;
    const { leadReference, companyId } = req.body;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedData = {
      leadReference: leadReference ? String(leadReference).trim() : undefined
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    // Check for duplicate lead reference (excluding current record)
    if (sanitizedData.leadReference) {
      const existing = await LeadReference.findOne({ 
        leadReference: sanitizedData.leadReference, 
        companyId: sanitizedCompanyId, 
        deleted: false,
        _id: { $ne: sanitizedId }
      });
      
      if (existing) {
        return res.status(400).json({ message: "Lead reference already exists for this company" });
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const leadReferenceDoc = await LeadReference.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    );

    if (!leadReferenceDoc) {
      return res.status(404).json({ message: "Lead reference not found" });
    }

    res.status(200).json({ message: "Lead reference updated successfully", leadReference: leadReferenceDoc });
  } catch (error) {
    console.error('Update lead reference error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const deleteLeadReference = async (req, res) => {
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

    const leadReferenceDoc = await LeadReference.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!leadReferenceDoc) {
      return res.status(404).json({ message: "Lead reference not found" });
    }

    res.status(200).json({ message: "Lead reference deleted successfully" });
  } catch (error) {
    console.error('Delete lead reference error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};