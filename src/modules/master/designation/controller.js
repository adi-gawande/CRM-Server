import Designation from "./model.js";

// ✅ Create Designation
export const createDesignation = async (req, res) => {
  try {
    const { employeeRole, designationName, designationCode, description } = req.body;

    if (!employeeRole || !designationName || !designationCode) {
      return res.status(400).json({ 
        message: "Employee Role, Designation Name, and Designation Code are required" 
      });
    }

    const existing = await Designation.findOne({ 
      $or: [
        { designationCode, deleted: false },
        { designationName, deleted: false }
      ]
    });
    
    if (existing) {
      return res.status(400).json({ 
        message: existing.designationCode === designationCode 
          ? "Designation code already exists" 
          : "Designation name already exists" 
      });
    }

    const designation = new Designation({ 
      employeeRole, 
      designationName, 
      designationCode: designationCode.toUpperCase(), 
      description 
    });
    await designation.save();

    res.status(201).json({ 
      message: "Designation created successfully", 
      designation 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Designations (non-deleted)
export const getDesignations = async (req, res) => {
  try {
    const designations = await Designation.find({ deleted: false }).sort({
      designationName: 1,
    });
    res.status(200).json(designations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Designation
export const updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeRole, designationName, designationCode, description } = req.body;

    // Check if another designation has the same code or name (excluding current one)
    const existing = await Designation.findOne({
      _id: { $ne: id },
      $or: [
        { designationCode: designationCode?.toUpperCase(), deleted: false },
        { designationName, deleted: false }
      ]
    });

    if (existing) {
      return res.status(400).json({ 
        message: existing.designationCode === designationCode?.toUpperCase() 
          ? "Designation code already exists" 
          : "Designation name already exists" 
      });
    }

    const designation = await Designation.findByIdAndUpdate(
      id,
      { 
        employeeRole, 
        designationName, 
        designationCode: designationCode?.toUpperCase(), 
        description 
      },
      { new: true }
    );

    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }

    res.status(200).json({ 
      message: "Designation updated successfully", 
      designation 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Designation
export const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;

    const designation = await Designation.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }

    res.status(200).json({ message: "Designation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};