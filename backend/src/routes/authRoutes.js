import express from "express";
import { login, me, registerTenant } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register-tenant", registerTenant);
router.post("/login", login);
router.get("/me", protect, me);

export default router;
