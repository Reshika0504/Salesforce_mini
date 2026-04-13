import { AuditLog } from "../models/AuditLog.js";
import { Contact } from "../models/Contact.js";
import { Deal } from "../models/Deal.js";
import { Lead } from "../models/Lead.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const tenantFilter = { tenantId: req.tenantId };

  const [leadCount, contactCount, dealCount, dealValue, recentActivity] = await Promise.all([
    Lead.countDocuments(tenantFilter),
    Contact.countDocuments(tenantFilter),
    Deal.countDocuments(tenantFilter),
    Deal.aggregate([
      { $match: { tenantId: req.user.tenantId } },
      { $group: { _id: null, totalValue: { $sum: "$value" } } },
    ]),
    AuditLog.find(tenantFilter).sort({ createdAt: -1 }).limit(10).populate("userId", "name role"),
  ]);

  res.json({
    summary: {
      leadCount,
      contactCount,
      dealCount,
      totalDealValue: dealValue[0]?.totalValue || 0,
    },
    recentActivity,
  });
});
