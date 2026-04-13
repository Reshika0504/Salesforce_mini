import mongoose from "mongoose";
import { DEAL_STAGES } from "../utils/constants.js";

const dealSchema = new mongoose.Schema(
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
    contactId: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
    title: { type: String, required: true, trim: true },
    value: { type: Number, default: 0 },
    stage: {
      type: String,
      enum: DEAL_STAGES,
      default: "new",
      index: true,
    },
    expectedCloseDate: { type: Date },
  },
  { timestamps: true }
);

dealSchema.index({ tenantId: 1, createdAt: -1 });
dealSchema.index({ tenantId: 1, stage: 1 });

export const Deal = mongoose.model("Deal", dealSchema);
