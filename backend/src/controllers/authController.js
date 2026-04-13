import { Tenant } from "../models/Tenant.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";
import { ROLES } from "../utils/constants.js";

export const registerTenant = asyncHandler(async (req, res) => {
  const { companyName, slug, domain, adminName, adminEmail, password } = req.body;

  const tenant = await Tenant.create({ name: companyName, slug, domain });
  const admin = await User.create({
    tenantId: tenant._id,
    name: adminName,
    email: adminEmail,
    password,
    role: ROLES.ADMIN,
  });

  res.status(201).json({
    message: "Tenant registered",
    token: generateToken(admin),
    user: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      tenantId: admin.tenantId,
    },
    tenant,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password, tenantSlug } = req.body;
  const tenant = await Tenant.findOne({ slug: tenantSlug, isActive: true });

  if (!tenant) {
    return res.status(404).json({ message: "Tenant not found" });
  }

  const user = await User.findOne({
    tenantId: tenant._id,
    email: email.toLowerCase(),
  });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: generateToken(user),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    },
    tenant,
  });
});

export const me = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.user.tenantId);

  res.json({
    user: req.user,
    tenant,
  });
});
