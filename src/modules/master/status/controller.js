import Status from "./model.js";

export const createStatus = async (req, res) => {
  try {
    const { status, companyId } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedData = {
      status: String(status).trim(),
      companyId: String(companyId).trim()
    };

    // Check for duplicate status within the same company
    const existing = await Status.findOne({ 
      status: sanitizedData.status, 
      companyId: sanitizedData.companyId, 
      deleted: false 
    });
    
    if (existing) {
      return res.status(400).json({ message: "Status already exists for this company" });
    }

    const statusDoc = new Status(sanitizedData);
    await statusDoc.save();

    res.status(201).json({ message: "Status created successfully", status: statusDoc });
  } catch (error) {
    console.error('Create status error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getStatuses = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const statuses = await Status.find({ 
      companyId: sanitizedCompanyId, 
      deleted: false 
    }).sort({
      status: 1,
    });
    
    res.status(200).json(statuses);
  } catch (error) {
    console.error('Get statuses error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, companyId } = req.body;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedData = {
      status: status ? String(status).trim() : undefined
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    // Check for duplicate status (excluding current record)
    if (sanitizedData.status) {
      const existing = await Status.findOne({ 
        status: sanitizedData.status, 
        companyId: sanitizedCompanyId, 
        deleted: false,
        _id: { $ne: sanitizedId }
      });
      
      if (existing) {
        return res.status(400).json({ message: "Status already exists for this company" });
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const statusDoc = await Status.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    );

    if (!statusDoc) {
      return res.status(404).json({ message: "Status not found" });
    }

    res.status(200).json({ message: "Status updated successfully", status: statusDoc });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const deleteStatus = async (req, res) => {
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

    const statusDoc = await Status.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!statusDoc) {
      return res.status(404).json({ message: "Status not found" });
    }

    res.status(200).json({ message: "Status deleted successfully" });
  } catch (error) {
    console.error('Delete status error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};