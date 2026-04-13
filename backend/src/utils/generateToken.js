import jwt from "jsonwebtoken";

export const generateToken = (user) =>
  jwt.sign(
    {
      sub: user._id,
      tenantId: user.tenantId,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
