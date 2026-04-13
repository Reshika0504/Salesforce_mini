import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
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
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    title: { type: String, trim: true },
  },
  { timestamps: true }
);

contactSchema.index({ tenantId: 1, createdAt: -1 });

export const Contact = mongoose.model("Contact", contactSchema);
