import { NextRequest, NextResponse } from "next/server";
import { AuthService, TokenService } from "@skillsync/auth";
import { successResponse, errorResponse, HttpStatus, logger } from "@skillsync/utils";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        errorResponse("Missing idToken", HttpStatus.BAD_REQUEST),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // 1. Authenticate user
    const user = await AuthService.authenticateWithGoogle(idToken);

    // 2. Generate tokens
    const { accessToken, refreshToken } = await TokenService.generateAuthTokens(user);

    // 3. Create response and set HTTP-only cookies
    const response = NextResponse.json(
      successResponse({ user }, "Authentication successful"),
      { status: HttpStatus.OK }
    );

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax", // Lax is generally better for cross-site top-level navigations
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    logger.info({ userId: user.id }, "User authenticated via Google");

    return response;
  } catch (error: any) {
    logger.error({ err: error }, "Google authentication failed");
    return NextResponse.json(
      errorResponse(error.message || "Authentication failed", error.statusCode || HttpStatus.UNAUTHORIZED),
      { status: error.statusCode || HttpStatus.UNAUTHORIZED }
    );
  }
}
