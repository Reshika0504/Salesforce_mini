import { AuditLog } from "../models/AuditLog.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { buildPagination } from "../utils/buildQuery.js";

export const listAuditLogs = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = { tenantId: req.tenantId };
  const [items, total] = await Promise.all([
    AuditLog.find(filter).populate("userId", "name email role").sort({ createdAt: -1 }).skip(skip).limit(limit),
    AuditLog.countDocuments(filter),
  ]);

  res.json({
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});
