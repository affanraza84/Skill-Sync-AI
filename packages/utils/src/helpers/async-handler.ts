import { errorHandler } from "../errors/error-handler";

type AsyncFunction = (...args: any[]) => Promise<any>;

/**
 * A wrapper to catch unhandled promise rejections and pass them to the error handler.
 * It's generic to work with Express or Next.js API routes depending on usage context.
 */
export const asyncHandler = (fn: AsyncFunction) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      return errorHandler(error);
    }
  };
};
