import { createUserAccount } from "../Auth/controller.js";
import User from "./model.js";

/**
 * CREATE USER
 */
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    await createUserAccount({
      email: user.email,
      password: String(user.contactNumber),
      role: req.body.role,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ALL USERS
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .populate("prefix")
      .populate("currentEmploymentDetail.department")
      .populate("currentEmploymentDetail.employeeRole")
      .populate("currentEmploymentDetail.designation")
      .populate("verifiedBy");

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET SINGLE USER
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("prefix")
      .populate("currentEmploymentDetail.department")
      .populate("currentEmploymentDetail.employeeRole")
      .populate("currentEmploymentDetail.designation")
      .populate("verifiedBy");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE USER
 */
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE USER (SOFT DELETE)
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
