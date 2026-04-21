import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@skillsync/db";
import { ApiError, HttpStatus } from "@skillsync/utils";
import { jwtConfig } from "../config/jwt";
import { JwtPayload, AuthTokens } from "../types/auth.types";
import { hashToken } from "../utils/hash";

const accessSecretKey = new TextEncoder().encode(jwtConfig.accessSecret);
const refreshSecretKey = new TextEncoder().encode(jwtConfig.refreshSecret);

export class TokenService {
  /**
   * Generates a short-lived access token.
   */
  static async generateAccessToken(payload: JwtPayload): Promise<string> {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(jwtConfig.accessExpiresIn)
      .sign(accessSecretKey);
  }

  /**
   * Generates a long-lived refresh token and stores its hash in the database.
   */
  static async generateRefreshToken(userId: string): Promise<string> {
    const rawToken = crypto.randomUUID() + "-" + Date.now();
    
    // We sign the random UUID so it's a verifiable JWT payload as well
    const refreshToken = await new SignJWT({ userId, type: "refresh" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setSubject(rawToken)
      .setExpirationTime(jwtConfig.refreshExpiresIn)
      .sign(refreshSecretKey);

    const hashedToken = hashToken(refreshToken);

    const expiresAt = new Date(Date.now() + jwtConfig.refreshExpiresInMs);

    await prisma.refreshToken.create({
      data: {
        token: hashedToken,
        userId,
        expiresAt,
      },
    });

    return refreshToken;
  }

  /**
   * Generates both tokens.
   */
  static async generateAuthTokens(user: { id: string; email: string }): Promise<AuthTokens> {
    const payload: JwtPayload = { userId: user.id, email: user.email };
    
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  /**
   * Verifies the access token and returns the payload.
   */
  static async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      const { payload } = await jwtVerify(token, accessSecretKey);
      return payload as unknown as JwtPayload;
    } catch (error) {
      throw new ApiError("Invalid or expired access token", HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * Rotates a refresh token: verifies it, deletes the old one, and issues new tokens.
   */
  static async rotateRefreshToken(token: string): Promise<AuthTokens> {
    try {
      // 1. Verify JWT signature and expiration
      const { payload } = await jwtVerify(token, refreshSecretKey);
      const userId = payload.userId as string;

      // 2. Hash token to look it up in DB
      const hashedToken = hashToken(token);

      // 3. Find and delete the token in one atomic operation
      // If it doesn't exist, it means it's either invalid, already used, or revoked.
      const storedToken = await prisma.refreshToken.delete({
        where: { token: hashedToken },
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new Error("Token expired or revoked");
      }

      // 4. Get user to generate new tokens
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error("User not found");
      }

      // 5. Issue new tokens
      return this.generateAuthTokens(user);

    } catch (error) {
      // Security best practice: if refresh token reuse is detected, you might want to 
      // revoke all refresh tokens for that user. For now, we just deny the request.
      throw new ApiError("Invalid refresh token", HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * Revokes a specific refresh token (used on logout).
   */
  static async revokeRefreshToken(token: string): Promise<void> {
    try {
      const hashedToken = hashToken(token);
      await prisma.refreshToken.delete({
        where: { token: hashedToken },
      });
    } catch (error) {
      // Ignore if it doesn't exist (already deleted)
    }
  }
}
