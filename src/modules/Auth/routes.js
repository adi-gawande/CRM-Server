// routes.js
import express from "express";
import { signup, login, logout, changePassword, me } from "./controller.js";

// If you already have middleware, uncomment this line and use it below
// import auth from "../middleware/auth.js";

const router = express.Router();

// PUBLIC
router.post("/signup", signup);
router.post("/login", login);

// PROTECTED — requires auth middleware
// router.get("/me", auth, me);          // Uncomment when auth middleware exists
// router.post("/change-password", auth, changePassword);
// router.post("/logout", auth, logout);

// TEMPORARY (until middleware is added) — PUBLIC for now
router.get("/me", me);
router.post("/change-password", changePassword);
router.post("/logout", logout);

export default router;
