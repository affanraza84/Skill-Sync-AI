import { ApiResponse } from "../types/common";
import { HttpStatus } from "../constants/http-status";

export const successResponse = <T>(
  data?: T,
  message: string = "Success"
): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (
  message: string,
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  errors?: any
) => {
  return {
    success: false,
    message,
    statusCode, // Optional, can be used by framework response wrappers
    errors,
  };
};
