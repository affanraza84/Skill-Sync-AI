import { z } from "zod";
import { ApiError } from "../errors/api-error";
import { HttpStatus } from "../constants/http-status";

export const validateRequest = <T>(schema: z.ZodType<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      throw new ApiError(
        "Validation failed",
        HttpStatus.BAD_REQUEST,
        formattedErrors
      );
    }
    throw error;
  }
};
