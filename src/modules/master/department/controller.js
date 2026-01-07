import Department from "./model.js";

export const createDepartment = async (req, res) => {
  try {
    const { departmentName, companyId } = req.body;

    if (!departmentName) {
      return res.status(400).json({ message: "Department name is required" });
    }

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedData = {
      departmentName: String(departmentName).trim(),
      companyId: String(companyId).trim()
    };

    // Check for duplicate department name within the same company
    const existing = await Department.findOne({ 
      departmentName: sanitizedData.departmentName, 
      companyId: sanitizedData.companyId, 
      deleted: false 
    });
    
    if (existing) {
      return res.status(400).json({ message: "Department name already exists for this company" });
    }

    const departmentDoc = new Department(sanitizedData);
    await departmentDoc.save();

    res.status(201).json({ message: "Department created successfully", department: departmentDoc });
  } catch (error) {
    console.error('Create department error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const departments = await Department.find({ 
      companyId: sanitizedCompanyId, 
      deleted: false 
    }).sort({
      departmentName: 1,
    });
    
    res.status(200).json(departments);
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName, companyId } = req.body;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedData = {
      departmentName: departmentName ? String(departmentName).trim() : undefined
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    // Check for duplicate department name (excluding current record)
    if (sanitizedData.departmentName) {
      const existing = await Department.findOne({ 
        departmentName: sanitizedData.departmentName, 
        companyId: sanitizedCompanyId, 
        deleted: false,
        _id: { $ne: sanitizedId }
      });
      
      if (existing) {
        return res.status(400).json({ message: "Department name already exists for this company" });
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const departmentDoc = await Department.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    );

    if (!departmentDoc) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department updated successfully", department: departmentDoc });
  } catch (error) {
    console.error('Update department error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const deleteDepartment = async (req, res) => {
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

    const departmentDoc = await Department.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!departmentDoc) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error('Delete department error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};