import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: isProduction
    ? undefined // In production, we log pure JSON for standard output
    : {
        target: "pino-pretty", // In development, we use pino-pretty for readable logs
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});
