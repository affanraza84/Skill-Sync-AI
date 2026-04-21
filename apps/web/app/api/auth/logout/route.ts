import { NextRequest, NextResponse } from "next/server";
import { TokenService } from "@skillsync/auth";
import { successResponse, HttpStatus, logger } from "@skillsync/utils";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (refreshToken) {
      // Revoke the refresh token in the database
      await TokenService.revokeRefreshToken(refreshToken);
    }

    const response = NextResponse.json(
      successResponse(null, "Logged out successfully"),
      { status: HttpStatus.OK }
    );

    // Clear cookies
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    logger.info("User logged out");

    return response;
  } catch (error) {
    logger.error({ err: error }, "Logout failed");
    // Even if it fails, clear cookies so the user is logged out on the client
    const response = NextResponse.json(
      successResponse(null, "Logged out with errors"),
      { status: HttpStatus.OK }
    );
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}
