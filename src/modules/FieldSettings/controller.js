import FieldSettings from "./model.js";

export const getFieldSettings = async (req, res) => {
  try {
    const { companyId, formType } = req.query;
    
    let settings = await FieldSettings.findOne({ companyId, formType });
    
    if (!settings) {
      settings = await FieldSettings.create({ companyId, formType, fieldSettings: {} });
    }
    
    res.status(200).json({
      success: true,
      data: settings.fieldSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateFieldSettings = async (req, res) => {
  try {
    const { companyId, formType, fieldSettings } = req.body;
    
    const settings = await FieldSettings.findOneAndUpdate(
      { companyId, formType },
      { fieldSettings },
      { new: true, upsert: true }
    );
    
    res.status(200).json({
      success: true,
      data: settings.fieldSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};