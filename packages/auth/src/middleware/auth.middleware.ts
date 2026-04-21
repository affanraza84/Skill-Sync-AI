import { TokenService } from "../services/token.service";
import { ApiError, HttpStatus } from "@skillsync/utils";
import { JwtPayload } from "../types/auth.types";

/**
 * Verifies the access token. Can be used across Express or Next.js.
 */
export async function getAuthUser(token?: string, authHeader?: string | null): Promise<JwtPayload> {
  if (!token) {
    // Fallback to Bearer token
    if (authHeader?.startsWith("Bearer ")) {
      const bearerToken = authHeader.split(" ")[1];
      return await TokenService.verifyAccessToken(bearerToken);
    }
    
    throw new ApiError("Not authenticated", HttpStatus.UNAUTHORIZED);
  }

  return await TokenService.verifyAccessToken(token);
}
