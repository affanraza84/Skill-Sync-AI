import { googleClient } from "../config/google";
import { prisma } from "@skillsync/db";
import { ApiError, HttpStatus } from "@skillsync/utils";

export class AuthService {
  /**
   * Verifies Google ID Token and returns user payload.
   */
  static async verifyGoogleToken(idToken: string) {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      
      if (!payload || !payload.email) {
        throw new Error("Invalid Google payload");
      }

      return {
        email: payload.email,
        name: payload.name || null,
        image: payload.picture || null,
      };
    } catch (error) {
      throw new ApiError("Invalid Google ID Token", HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * Authenticates user via Google. Creates user if they don't exist.
   */
  static async authenticateWithGoogle(idToken: string) {
    const googleUser = await this.verifyGoogleToken(idToken);

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name,
          image: googleUser.image,
          profile: {
            create: {} // Create an empty profile automatically
          }
        },
      });
    } else {
      // Update image/name if changed (optional)
      if (user.name !== googleUser.name || user.image !== googleUser.image) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            name: googleUser.name,
            image: googleUser.image,
          },
        });
      }
    }

    return user;
  }
}
