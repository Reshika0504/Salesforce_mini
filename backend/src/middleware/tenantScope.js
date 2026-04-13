export const withTenantScope = (req, _res, next) => {
  req.scope = { tenantId: req.tenantId };
  next();
};
