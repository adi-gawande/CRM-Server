import Role from "./model.js";

// ✅ Create Role
export const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Role name is required" });
    }

    const existing = await Role.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const role = new Role({ name });
    await role.save();

    res.status(201).json({
      message: "Role created successfully",
      role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Roles (non-deleted)
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await Role.findByIdAndUpdate(id, { name }, { new: true });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({
      message: "Role updated successfully",
      role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Role
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({
      message: "Role deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
