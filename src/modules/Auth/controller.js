// authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./model.js"; // adjust path if needed

// helpers
const JWT_SECRET = process.env.JWT_SECRET || "replace_this_in_prod";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const USE_COOKIES = process.env.USE_COOKIES === "true";

/**
 * createUserAccount
 * Creates a user with email, password, role
 * Can be used internally (admin, seeders, tests)
 *
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @param {string} [params.role="user"]
 * @param {string} [params.name=""]
 *
 * @returns {Object} created user (mongoose doc)
 */
export const createUserAccount = async ({
  email,
  password,
  role = "admin",
  companyId = null,
  userId = null,
}) => {
  console.log(email, password);

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email: normalizedEmail,
    password: hashedPassword,
    role,
    companyId,
    userId,
  });

  return user;
};

/**
 * Create JWT for a user id + role
 * @param {Object} payload - e.g. { id: user._id, role: user.role }
 * @returns {String} token
 */
const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

/**
 * Strip sensitive fields from user object before sending to client
 */
const sanitizeUser = (userDoc) => {
  if (!userDoc) return null;
  const u = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  delete u.password;
  return u;
};

/**
 * Send token to client. If USE_COOKIES env var is true we set HttpOnly cookie.
 */
const sendAuthResponse = (res, user, message = "Success", status = 200) => {
  const payload = { id: user._id, role: user.role || null };
  const token = createToken(payload);

  if (USE_COOKIES) {
    // set JWT in HttpOnly cookie (secure should be true in prod with https)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // optional: 7 days
    });
    return res.status(status).json({
      success: true,
      message,
      data: { user: sanitizeUser(user) },
    });
  }

  // default: return token in response body
  return res.status(status).json({
    success: true,
    message,
    data: { token, user: sanitizeUser(user) },
  });
};

/**
 * Signup - create new user
 * Expects: { name, email, password, role } in body (adjust to your schema fields)
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body || {};

    // basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    if (typeof password === "string" && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const user = await createUserAccount({
      email,
      password,
      role,
    });

    return sendAuthResponse(res, user, "User created", 201);
  } catch (err) {
    console.error("signup error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Login - returns token + sanitized user
 * Expects: { email, password }
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    return sendAuthResponse(res, user, "Login successful", 200);
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Logout - clears cookie if used, otherwise client should drop token
 */
export const logout = async (req, res) => {
  try {
    if (USE_COOKIES) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return res.json({ success: true, message: "Logged out" });
    }
    // If not using cookies, front-end should delete token. Still return success.
    return res.json({
      success: true,
      message: "Logged out (client-side token must be cleared)",
    });
  } catch (err) {
    console.error("logout error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * changePassword - supports two modes:
 * 1) authenticated user: req.user must be set (by an auth middleware)
 *    body: { oldPassword, newPassword }
 * 2) admin / route with email: body { email, newPassword } (no oldPassword required)
 */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, email } = req.body || {};

    if (
      !newPassword ||
      typeof newPassword !== "string" ||
      newPassword.length < 6
    ) {
      return res.status(400).json({
        success: false,
        message: "newPassword is required and must be at least 6 characters",
      });
    }

    // If email provided and requester is an admin, allow changing without oldPassword
    if (email && (!req.user || req.user.role !== "admin")) {
      // Only admin should use the email-based flow; change this as per your app roles
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to change by email" });
    }

    let user = null;

    if (req.user && req.user.id) {
      // authenticated route (user changing their own password)
      user = await User.findById(req.user.id);
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });

      if (!oldPassword) {
        return res
          .status(400)
          .json({ success: false, message: "oldPassword is required" });
      }
      const valid = await bcrypt.compare(oldPassword, user.password);
      if (!valid)
        return res
          .status(401)
          .json({ success: false, message: "Incorrect current password" });
    } else if (email) {
      // admin flow (already guarded above)
      user = await User.findOne({ email: String(email).trim().toLowerCase() });
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Either be authenticated (req.user) or provide email (admin only) to change password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error("changePassword error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * me - returns current authenticated user's data (req.user must be set by auth middleware)
 */
export const me = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    return res.json({ success: true, data: user });
  } catch (err) {
    console.error("me error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default {
  signup,
  login,
  logout,
  changePassword,
  me,
};
