import ProductCategory from "./model.js";

export const createProductCategory = async (req, res) => {
  try {
    const { productName, companyId } = req.body;

    if (!productName) {
      return res.status(400).json({ message: "Product name is required" });
    }

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedData = {
      productName: String(productName).trim(),
      companyId: String(companyId).trim()
    };

    // Check for duplicate product name within the same company
    const existing = await ProductCategory.findOne({ 
      productName: sanitizedData.productName, 
      companyId: sanitizedData.companyId, 
      deleted: false 
    });
    
    if (existing) {
      return res.status(400).json({ message: "Product name already exists for this company" });
    }

    const productCategory = new ProductCategory(sanitizedData);
    await productCategory.save();

    res.status(201).json({ message: "Product category created successfully", productCategory });
  } catch (error) {
    console.error('Create product category error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getProductCategories = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const productCategories = await ProductCategory.find({ 
      companyId: sanitizedCompanyId, 
      deleted: false 
    }).sort({
      productName: 1,
    });
    
    res.status(200).json(productCategories);
  } catch (error) {
    console.error('Get product categories error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const updateProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, companyId } = req.body;

    if (!companyId || typeof companyId !== 'string') {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedData = {
      productName: productName ? String(productName).trim() : undefined
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    // Check for duplicate product name (excluding current record)
    if (sanitizedData.productName) {
      const existing = await ProductCategory.findOne({ 
        productName: sanitizedData.productName, 
        companyId: sanitizedCompanyId, 
        deleted: false,
        _id: { $ne: sanitizedId }
      });
      
      if (existing) {
        return res.status(400).json({ message: "Product name already exists for this company" });
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const productCategory = await ProductCategory.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    );

    if (!productCategory) {
      return res.status(404).json({ message: "Product category not found" });
    }

    res.status(200).json({ message: "Product category updated successfully", productCategory });
  } catch (error) {
    console.error('Update product category error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const deleteProductCategory = async (req, res) => {
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

    const productCategory = await ProductCategory.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!productCategory) {
      return res.status(404).json({ message: "Product category not found" });
    }

    res.status(200).json({ message: "Product category deleted successfully" });
  } catch (error) {
    console.error('Delete product category error:', error);
    res.status(500).json({ message: "Server error occurred" });
  }
};