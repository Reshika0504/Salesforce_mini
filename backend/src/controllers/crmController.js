import { AuditLog } from "../models/AuditLog.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { buildPagination } from "../utils/buildQuery.js";

const buildListResponse = async (Model, req, populate = "") => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = { tenantId: req.tenantId };
  const [items, total] = await Promise.all([
    Model.find(filter).populate(populate).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Model.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const createAuditLog = async (req, entityType, entityId, action, metadata = {}) => {
  await AuditLog.create({
    tenantId: req.tenantId,
    userId: req.user._id,
    entityType,
    entityId,
    action,
    metadata,
  });
};

export const listEntities = (Model, populate = "") =>
  asyncHandler(async (req, res) => {
    res.json(await buildListResponse(Model, req, populate));
  });

export const createEntity = (Model, entityType) =>
  asyncHandler(async (req, res) => {
    const payload = {
      ...req.body,
      tenantId: req.tenantId,
      ownerId: req.user._id,
    };

    const item = await Model.create(payload);
    await createAuditLog(req, entityType, item._id, `${entityType}.created`, payload);
    res.status(201).json(item);
  });

export const updateEntity = (Model, entityType) =>
  asyncHandler(async (req, res) => {
    const item = await Model.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: `${entityType} not found` });
    }

    await createAuditLog(req, entityType, item._id, `${entityType}.updated`, req.body);
    res.json(item);
  });

export const deleteEntity = (Model, entityType) =>
  asyncHandler(async (req, res) => {
    const item = await Model.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.tenantId,
    });

    if (!item) {
      return res.status(404).json({ message: `${entityType} not found` });
    }

    await createAuditLog(req, entityType, item._id, `${entityType}.deleted`);
    res.json({ message: `${entityType} deleted` });
  });
