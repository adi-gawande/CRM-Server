import Ledger from "./model.js";

/**
 * @desc    Create new Ledger
 * @route   POST /api/ledger
 */
export const createLedger = async (req, res) => {
  try {
    const { name, ledgerType } = req.body;

    if (!name || !ledgerType) {
      return res.status(400).json({
        success: false,
        message: "Name and Ledger Type are required",
      });
    }

    const ledger = await Ledger.create({
      name,
      ledgerType,
    });

    res.status(201).json({
      success: true,
      message: "Ledger created successfully",
      data: ledger,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all Ledgers (non-deleted)
 * @route   GET /api/ledger
 */
export const getAllLedgers = async (req, res) => {
  try {
    const ledgers = await Ledger.find({ deleted: false }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: ledgers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get Ledger by ID
 * @route   GET /api/ledger/:id
 */
export const getLedgerById = async (req, res) => {
  try {
    const ledger = await Ledger.findOne({
      _id: req.params.id,
      deleted: false,
    });

    if (!ledger) {
      return res.status(404).json({
        success: false,
        message: "Ledger not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ledger,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update Ledger
 * @route   PUT /api/ledger/:id
 */
export const updateLedger = async (req, res) => {
  try {
    const { name, ledgerType } = req.body;

    const ledger = await Ledger.findByIdAndUpdate(
      req.params.id,
      { name, ledgerType },
      { new: true, runValidators: true }
    );

    if (!ledger) {
      return res.status(404).json({
        success: false,
        message: "Ledger not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ledger updated successfully",
      data: ledger,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Soft Delete Ledger
 * @route   DELETE /api/ledger/:id
 */
export const deleteLedger = async (req, res) => {
  try {
    const ledger = await Ledger.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!ledger) {
      return res.status(404).json({
        success: false,
        message: "Ledger not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ledger deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
