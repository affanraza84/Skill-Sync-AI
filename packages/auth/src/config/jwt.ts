export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET || "default_access_secret_do_not_use_in_prod",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "default_refresh_secret_do_not_use_in_prod",
  accessExpiresIn: "15m", // 15 minutes
  refreshExpiresIn: "7d", // 7 days
  refreshExpiresInMs: 7 * 24 * 60 * 60 * 1000,
};
