import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@skillsync/auth";
import { successResponse, errorResponse, HttpStatus } from "@skillsync/utils";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    const authHeader = req.headers.get("authorization");

    // 1. Authenticate the request
    const payload = await getAuthUser(token, authHeader);

    // 2. Return the user info (could also fetch full user from DB if needed)
    return NextResponse.json(
      successResponse({ user: payload }, "Authenticated successfully"),
      { status: HttpStatus.OK }
    );
  } catch (error: any) {
    return NextResponse.json(
      errorResponse(error.message || "Unauthorized", error.statusCode || HttpStatus.UNAUTHORIZED),
      { status: error.statusCode || HttpStatus.UNAUTHORIZED }
    );
  }
}
