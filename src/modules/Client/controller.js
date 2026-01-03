import client from "./model.js";

/**
 * CREATE CLIENT
 */
export const createClient = async (req, res) => {
  const client = await client.create(req.body);
  res.status(201).json({
    success: true,
    data: client,
  });
};

/**
 * GET ALL CLIENTS
 */
export const getAllClients = async (req, res) => {
  const clients = await client.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: clients.length,
    data: clients,
  });
};

/**
 * GET CLIENT BY ID
 */
export const getClientById = async (req, res) => {
  const client = await client.findById(req.params.id);

  if (!client) {
    return res.status(404).json({
      success: false,
      message: "Client not found",
    });
  }

  res.status(200).json({
    success: true,
    data: client,
  });
};

/**
 * UPDATE CLIENT
 */
export const updateClient = async (req, res) => {
  const client = await client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!client) {
    return res.status(404).json({
      success: false,
      message: "Client not found",
    });
  }

  res.status(200).json({
    success: true,
    data: client,
  });
};

/**
 * DELETE CLIENT
 */
export const deleteClient = async (req, res) => {
  const client = await client.findById(req.params.id);

  if (!client) {
    return res.status(404).json({
      success: false,
      message: "Client not found",
    });
  }

  await client.deleteOne();

  res.status(200).json({
    success: true,
    message: "Client deleted successfully",
  });
};
