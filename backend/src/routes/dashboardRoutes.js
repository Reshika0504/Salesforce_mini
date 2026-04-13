import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";
import { withTenantScope } from "../middleware/tenantScope.js";

const router = express.Router();

router.get("/", protect, withTenantScope, getDashboard);

export default router;
