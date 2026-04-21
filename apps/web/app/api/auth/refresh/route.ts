import { NextRequest, NextResponse } from "next/server";
import { TokenService } from "@skillsync/auth";
import { successResponse, errorResponse, HttpStatus, logger } from "@skillsync/utils";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        errorResponse("No refresh token provided", HttpStatus.UNAUTHORIZED),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // Rotate tokens (verifies, deletes old, creates new)
    const tokens = await TokenService.rotateRefreshToken(refreshToken);

    const response = NextResponse.json(
      successResponse(null, "Tokens refreshed successfully"),
      { status: HttpStatus.OK }
    );

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    response.cookies.set("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    logger.info("Tokens rotated successfully");

    return response;
  } catch (error: any) {
    logger.error({ err: error }, "Token rotation failed");
    return NextResponse.json(
      errorResponse(error.message || "Invalid refresh token", HttpStatus.UNAUTHORIZED),
      { status: HttpStatus.UNAUTHORIZED }
    );
  }
}
