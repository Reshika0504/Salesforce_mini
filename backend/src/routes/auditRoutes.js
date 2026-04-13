import express from "express";
import { listAuditLogs } from "../controllers/auditController.js";
import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/rbac.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

router.get("/", protect, authorize(ROLES.ADMIN, ROLES.MANAGER), listAuditLogs);

export default router;
