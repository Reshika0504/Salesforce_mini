import mongoose from "mongoose";
import { LEAD_STATUSES } from "../utils/constants.js";

const leadSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    company: { type: String, trim: true },
    source: { type: String, trim: true },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "new",
      index: true,
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

leadSchema.index({ tenantId: 1, createdAt: -1 });
leadSchema.index({ tenantId: 1, status: 1 });

export const Lead = mongoose.model("Lead", leadSchema);
