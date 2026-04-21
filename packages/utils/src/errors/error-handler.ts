import { errorResponse } from "../api/response";
import { HttpStatus } from "../constants/http-status";
import { logger } from "../logger/logger";
import { ApiError } from "./api-error";

export const errorHandler = (err: any) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || "Something went wrong";
    error = new ApiError(message, statusCode, undefined, false);
  }

  // Log error using structured logger
  if (error.statusCode >= 500) {
    logger.error({ 
      err: error, 
      stack: error.stack 
    }, "Internal Server Error");
  } else {
    logger.warn({ 
      message: error.message, 
      statusCode: error.statusCode,
      errors: error.errors
    }, "Operational Error");
  }

  // Hide stack trace and details in production for 500 errors
  const responseMessage =
    process.env.NODE_ENV === "production" && error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR
      ? "Internal Server Error"
      : error.message;

  return errorResponse(responseMessage, error.statusCode, error.errors);
};
