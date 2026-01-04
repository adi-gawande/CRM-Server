import BankDetails from "./model.js";

// ✅ Create BankDetails
export const createBankDetails = async (req, res) => {
  try {
    const { accountName, accountNumber, bankName, branch, ifsc, upi, companyId } = req.body;

    if (!accountName || !accountNumber || !bankName || !branch || !ifsc) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    // Validate and sanitize inputs
    const sanitizedData = {
      accountName: String(accountName).trim(),
      accountNumber: String(accountNumber).trim(),
      bankName: String(bankName).trim(),
      branch: String(branch).trim(),
      ifsc: String(ifsc).trim().toUpperCase(),
      upi: upi ? String(upi).trim() : undefined,
      companyId: String(companyId).trim()
    };

    // Check for duplicate account number within the same company
    const existing = await BankDetails.findOne({ 
      accountNumber: sanitizedData.accountNumber, 
      companyId: sanitizedData.companyId, 
      deleted: false 
    });
    
    if (existing) {
      return res.status(400).json({ message: "Account number already exists for this company" });
    }

    const bankDetails = new BankDetails(sanitizedData);
    
    await bankDetails.save();

    res.status(201).json({ message: "Bank details created successfully", bankDetails });
  } catch (error) {
    console.error('Create bank details error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// ✅ Get All BankDetails (non-deleted) for a specific company
export const getBankDetails = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const bankDetails = await BankDetails.find({ 
      companyId: sanitizedCompanyId, 
      deleted: false 
    }).sort({
      accountName: 1,
    });
    
    res.status(200).json(bankDetails);
  } catch (error) {
    console.error('Get bank details error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// ✅ Update BankDetails
export const updateBankDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountName, accountNumber, bankName, branch, ifsc, upi, companyId } = req.body;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    // Sanitize inputs
    const sanitizedData = {
      accountName: accountName ? String(accountName).trim() : undefined,
      accountNumber: accountNumber ? String(accountNumber).trim() : undefined,
      bankName: bankName ? String(bankName).trim() : undefined,
      branch: branch ? String(branch).trim() : undefined,
      ifsc: ifsc ? String(ifsc).trim().toUpperCase() : undefined,
      upi: upi ? String(upi).trim() : undefined
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    // Check for duplicate account number (excluding current record)
    if (sanitizedData.accountNumber) {
      const existing = await BankDetails.findOne({ 
        accountNumber: sanitizedData.accountNumber, 
        companyId: sanitizedCompanyId, 
        deleted: false,
        _id: { $ne: sanitizedId }
      });
      
      if (existing) {
        return res.status(400).json({ message: "Account number already exists for this company" });
      }
    }

    // Remove undefined values
    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const bankDetails = await BankDetails.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    );

    if (!bankDetails) {
      return res.status(404).json({ message: "Bank details not found" });
    }

    res.status(200).json({ message: "Bank details updated successfully", bankDetails });
  } catch (error) {
    console.error('Update bank details error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// ✅ Soft Delete BankDetails
export const deleteBankDetails = async (req, res) => {
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

    const bankDetails = await BankDetails.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!bankDetails) {
      return res.status(404).json({ message: "Bank details not found" });
    }

    res.status(200).json({ message: "Bank details deleted successfully" });
  } catch (error) {
    console.error('Delete bank details error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};