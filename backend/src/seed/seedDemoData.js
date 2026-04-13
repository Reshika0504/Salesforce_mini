import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { AuditLog } from "../models/AuditLog.js";
import { Contact } from "../models/Contact.js";
import { Deal } from "../models/Deal.js";
import { Lead } from "../models/Lead.js";
import { Tenant } from "../models/Tenant.js";
import { User } from "../models/User.js";
import { ROLES } from "../utils/constants.js";

dotenv.config();

const seed = async () => {
  await connectDB();

  await Promise.all([
    AuditLog.deleteMany({}),
    Deal.deleteMany({}),
    Contact.deleteMany({}),
    Lead.deleteMany({}),
    User.deleteMany({}),
    Tenant.deleteMany({}),
  ]);

  const tenant = await Tenant.create({
    name: "Acme Corporation",
    slug: "acme",
    domain: "acme.local",
  });

  const [admin, manager, employee] = await User.create([
    {
      tenantId: tenant._id,
      name: "Alice Admin",
      email: "admin@acme.com",
      password: "password123",
      role: ROLES.ADMIN,
    },
    {
      tenantId: tenant._id,
      name: "Mark Manager",
      email: "manager@acme.com",
      password: "password123",
      role: ROLES.MANAGER,
    },
    {
      tenantId: tenant._id,
      name: "Evan Employee",
      email: "employee@acme.com",
      password: "password123",
      role: ROLES.EMPLOYEE,
    },
  ]);

  const contact = await Contact.create({
    tenantId: tenant._id,
    ownerId: manager._id,
    name: "Nina Patel",
    email: "nina@northwind.io",
    phone: "+91-9876543210",
    company: "Northwind",
    title: "Procurement Lead",
  });

  const lead = await Lead.create({
    tenantId: tenant._id,
    ownerId: employee._id,
    name: "John Prospect",
    email: "john@prospect.io",
    company: "Prospect Labs",
    source: "Website",
    status: "qualified",
  });

  const deal = await Deal.create({
    tenantId: tenant._id,
    ownerId: manager._id,
    contactId: contact._id,
    title: "Northwind Expansion",
    value: 25000,
    stage: "proposal",
  });

  await AuditLog.create([
    {
      tenantId: tenant._id,
      userId: admin._id,
      entityType: "tenant",
      entityId: tenant._id,
      action: "tenant.created",
    },
    {
      tenantId: tenant._id,
      userId: employee._id,
      entityType: "lead",
      entityId: lead._id,
      action: "lead.created",
    },
    {
      tenantId: tenant._id,
      userId: manager._id,
      entityType: "deal",
      entityId: deal._id,
      action: "deal.created",
    },
  ]);

  console.log("Demo data seeded");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
