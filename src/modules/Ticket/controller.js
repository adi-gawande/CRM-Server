import Ticket from "./model.js";

/**
 * CREATE TICKET
 */
export const createTicket = async (req, res) => {
  const ticket = await Ticket.create(req.body);
  res.status(201).json({
    success: true,
    data: ticket,
  });
};

/**
 * GET ALL TICKETS
 */
export const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find({ deleted: false })
    .populate("clientId", "ClientName")
    .populate("productId", "productName")
    .populate("priorityId", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tickets.length,
    data: tickets,
  });
};

/**
 * GET TICKET BY ID
 */
export const getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate("clientId", "ClientName")
    .populate("productId", "productName")
    .populate("priorityId", "name");

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  res.status(200).json({
    success: true,
    data: ticket,
  });
};

/**
 * UPDATE TICKET
 */
export const updateTicket = async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  res.status(200).json({
    success: true,
    data: ticket,
  });
};

/**
 * DELETE TICKET
 */
export const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { deleted: true },
    { new: true }
  );

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Ticket deleted successfully",
  });
};