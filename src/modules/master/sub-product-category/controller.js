import SubProductCategory from "./model.js";

export const createSubProductCategory = async (req, res) => {
  try {
    const { productCategoryId, subProductName, companyId } = req.body;

    if (!productCategoryId || !subProductName) {
      return res
        .status(400)
        .json({
          message: "Product category and sub product name are required",
        });
    }

    if (!companyId || typeof companyId !== "string") {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedData = {
      productCategoryId: String(productCategoryId).trim(),
      subProductName: String(subProductName).trim(),
      companyId: String(companyId).trim(),
    };

    // Check for duplicate sub product name within the same product category
    const existing = await SubProductCategory.findOne({
      productCategoryId: sanitizedData.productCategoryId,
      subProductName: sanitizedData.subProductName,
      companyId: sanitizedData.companyId,
      deleted: false,
    });

    if (existing) {
      return res
        .status(400)
        .json({
          message: "Sub product name already exists for this product category",
        });
    }

    const subProductCategory = new SubProductCategory(sanitizedData);
    await subProductCategory.save();

    res
      .status(201)
      .json({
        message: "Sub product category created successfully",
        subProductCategory,
      });
  } catch (error) {
    console.error("Create sub product category error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getSubProductCategories = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId || typeof companyId !== "string") {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();

    const subProductCategories = await SubProductCategory.find({
      companyId: sanitizedCompanyId,
      deleted: false,
    })
      .populate("productCategoryId", "productName")
      .sort({
        subProductName: 1,
      });

    res.status(200).json(subProductCategories);
  } catch (error) {
    console.error("Get sub product categories error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const getProductsSubProductCategories = async (req, res) => {
  try {
    const { productId } = req.params;

    // if (!companyId || typeof companyId !== 'string') {
    //   return res.status(400).json({ message: "Valid Company ID is required" });
    // }

    // const sanitizedCompanyId = String(companyId).trim();

    const subProductCategories = await SubProductCategory.find({
      productCategoryId: productId,
      deleted: false,
    })
      .populate("productCategoryId", "productName")
      .sort({
        subProductName: 1,
      });

    res.status(200).json(subProductCategories);
  } catch (error) {
    console.error("Get sub product categories error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const updateSubProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { productCategoryId, subProductName, companyId } = req.body;

    if (!companyId || typeof companyId !== "string") {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedData = {
      productCategoryId: productCategoryId
        ? String(productCategoryId).trim()
        : undefined,
      subProductName: subProductName
        ? String(subProductName).trim()
        : undefined,
    };

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    // Check for duplicate sub product name (excluding current record)
    if (sanitizedData.subProductName && sanitizedData.productCategoryId) {
      const existing = await SubProductCategory.findOne({
        productCategoryId: sanitizedData.productCategoryId,
        subProductName: sanitizedData.subProductName,
        companyId: sanitizedCompanyId,
        deleted: false,
        _id: { $ne: sanitizedId },
      });

      if (existing) {
        return res
          .status(400)
          .json({
            message:
              "Sub product name already exists for this product category",
          });
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(sanitizedData).filter(([_, value]) => value !== undefined)
    );

    const subProductCategory = await SubProductCategory.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      updateData,
      { new: true }
    ).populate("productCategoryId", "productName");

    if (!subProductCategory) {
      return res
        .status(404)
        .json({ message: "Sub product category not found" });
    }

    res
      .status(200)
      .json({
        message: "Sub product category updated successfully",
        subProductCategory,
      });
  } catch (error) {
    console.error("Update sub product category error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const deleteSubProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyId } = req.body;

    if (!companyId || typeof companyId !== "string") {
      return res.status(400).json({ message: "Valid Company ID is required" });
    }

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const sanitizedCompanyId = String(companyId).trim();
    const sanitizedId = String(id).trim();

    const subProductCategory = await SubProductCategory.findOneAndUpdate(
      { _id: sanitizedId, companyId: sanitizedCompanyId },
      { deleted: true },
      { new: true }
    );

    if (!subProductCategory) {
      return res
        .status(404)
        .json({ message: "Sub product category not found" });
    }

    res
      .status(200)
      .json({ message: "Sub product category deleted successfully" });
  } catch (error) {
    console.error("Delete sub product category error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};
