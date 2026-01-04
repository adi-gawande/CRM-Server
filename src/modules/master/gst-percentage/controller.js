import GstPercentage from "./model.js";

export const createGstPercentage = async (req, res) => {
  try {
    const { gstPercentage, companyId } = req.body;

    if (gstPercentage === undefined || gstPercentage === null) {
      return res.status(400).json({ message: "GST percentage is required" });
    }

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedData = {
      gstPercentage: Number(gstPercentage),
      companyId: String(companyId).trim()
    };

    if (isNaN(sanitizedData.gstPercentage) || sanitizedData.gstPercentage < 0 || sanitizedData.gstPercentage > 100) {
      return res.status(400).json({ message: "GST percentage must be a number between 0 and 100" });
    }

    // Check for duplicate GST percentage within the same company
    const existing = await GstPercentage.findOne({ 
      gstPercentage: sanitizedData.gstPercentage, 
      companyId: sanitizedData.companyId, 
      deleted: false 
    });
    
    if (existing) {
      return res.status(400).json({ message: "GST percentage already exists for this company" });
    }

    const gstPercentageDoc = new GstPercentage(sanitizedData);
    await gstPercentageDoc.save();

    res.status(201).json({ message: "GST percentage created successfully", gstPercentage: gstPercentageDoc });
  } catch (error) {
    console.error('Create GST percentage error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getGstPercentages = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const gstPercentages = await GstPercentage.find({ 
      companyId: sanitizedCompanyId, 
      deleted: false 
    }).sort({
      gstPercentage: 1,
    });
    
    res.status(200).json(gstPercentages);
  } catch (error) {
    console.error('Get GST percentages error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const updateGstPercentage = async (req, res) => {
  try {
    const { id } = req.params;
    const { gstPercentage, companyId } = req.body;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedData = {
      gstPercentage: gstPercentage !== undefined ? Number(gstPercentage) : undefined
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    if (sanitizedData.gstPercentage !== undefined && (isNaN(sanitizedData.gstPercentage) || sanitizedData.gstPercentage < 0 || sanitizedData.gstPercentage > 100)) {
      return res.status(400).json({ message: "GST percentage must be a number between 0 and 100" });
    }

    // Check for duplicate GST percentage (excluding current record)
    if (sanitizedData.gstPercentage !== undefined) {
      const existing = await GstPercentage.findOne({ 
        gstPercentage: sanitizedData.gstPercentage, 
        companyId: sanitizedCompanyId, 
        deleted: false,
        _id: { $ne: sanitizedId }
      });
      
      if (existing) {
        return res.status(400).json({ message: "GST percentage already exists for this company" });
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const gstPercentageDoc = await GstPercentage.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    );

    if (!gstPercentageDoc) {
      return res.status(404).json({ message: "GST percentage not found" });
    }

    res.status(200).json({ message: "GST percentage updated successfully", gstPercentage: gstPercentageDoc });
  } catch (error) {
    console.error('Update GST percentage error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const deleteGstPercentage = async (req, res) => {
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

    const gstPercentageDoc = await GstPercentage.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!gstPercentageDoc) {
      return res.status(404).json({ message: "GST percentage not found" });
    }

    res.status(200).json({ message: "GST percentage deleted successfully" });
  } catch (error) {
    console.error('Delete GST percentage error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};