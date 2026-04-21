import { z } from "zod";
import { asyncHandler } from "@skillsync/utils";
import { validateRequest } from "@skillsync/utils";
import { logger } from "@skillsync/utils";
import { successResponse } from "@skillsync/utils";
import { ApiError } from "@skillsync/utils";
import { HttpStatus } from "@skillsync/utils";

// Example Request Schema
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

/**
 * Example API Route Handler
 * Wrapped in asyncHandler to automatically catch validation errors or runtime errors.
 */
export const createUserRoute = asyncHandler(async (req: any, res: any) => {
  logger.info({ path: req.path }, "Incoming request to create user");

  // 1. Validate request
  // This throws an ApiError(BAD_REQUEST) automatically if invalid
  const validatedData = validateRequest(CreateUserSchema, req.body);

  // 2. Perform business logic
  logger.debug({ email: validatedData.email }, "Creating user in database...");
  
  if (validatedData.email === "error@example.com") {
    // Manually throwing an operational error
    throw new ApiError("Email already in use", HttpStatus.CONFLICT);
  }

  const mockUser = {
    id: "uuid-1234",
    ...validatedData,
  };

  logger.info({ userId: mockUser.id }, "User created successfully");

  // 3. Return standardized response
  const response = successResponse(mockUser, "User created successfully");
  
  // Note: Depending on your framework (Next.js/Express), returning or sending the response will differ
  // return NextResponse.json(response); // for Next.js
  res.status(HttpStatus.CREATED).json(response); // for Express
});
