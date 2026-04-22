export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET || "default_access_secret_do_not_use_in_prod",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "default_refresh_secret_do_not_use_in_prod",
  accessExpiresIn: "3650d", // 10 years
  refreshExpiresIn: "3650d", // 10 years
  refreshExpiresInMs: 10 * 365 * 24 * 60 * 60 * 1000,
};
