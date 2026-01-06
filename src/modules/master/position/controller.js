import Position from "./model.js";

export const createPosition = async (req, res) => {
  try {
    const { positionName, companyId } = req.body;

    if (!positionName) {
      return res.status(400).json({ message: "Position name is required" });
    }

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedData = {
      positionName: String(positionName).trim(),
      companyId: String(companyId).trim()
    };

    // Check for duplicate position name within the same company
    const existing = await Position.findOne({ 
      positionName: sanitizedData.positionName, 
      companyId: sanitizedData.companyId, 
      deleted: false 
    });
    
    if (existing) {
      return res.status(400).json({ message: "Position name already exists for this company" });
    }

    const positionDoc = new Position(sanitizedData);
    await positionDoc.save();

    res.status(201).json({ message: "Position created successfully", position: positionDoc });
  } catch (error) {
    console.error('Create position error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getPositions = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const positions = await Position.find({ 
      companyId: sanitizedCompanyId, 
      deleted: false 
    }).sort({
      positionName: 1,
    });
    
    res.status(200).json(positions);
  } catch (error) {
    console.error('Get positions error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { positionName, companyId } = req.body;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedData = {
      positionName: positionName ? String(positionName).trim() : undefined
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    // Check for duplicate position name (excluding current record)
    if (sanitizedData.positionName) {
      const existing = await Position.findOne({ 
        positionName: sanitizedData.positionName, 
        companyId: sanitizedCompanyId, 
        deleted: false,
        _id: { $ne: sanitizedId }
      });
      
      if (existing) {
        return res.status(400).json({ message: "Position name already exists for this company" });
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const positionDoc = await Position.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    );

    if (!positionDoc) {
      return res.status(404).json({ message: "Position not found" });
    }

    res.status(200).json({ message: "Position updated successfully", position: positionDoc });
  } catch (error) {
    console.error('Update position error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const deletePosition = async (req, res) => {
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

    const positionDoc = await Position.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!positionDoc) {
      return res.status(404).json({ message: "Position not found" });
    }

    res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    console.error('Delete position error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};