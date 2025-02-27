import { prisma } from "../config/prisma";
import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth/jwt";

export class PrAuthRepository implements AuthRepository {
  async generateTokens(
    userId: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    await prisma.refreshToken.upsert({
      where: { userId },
      update: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      create: {
        userId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    return { accessToken, refreshToken };
  }

  async findRefreshTokenByUserId(userId: string): Promise<string | null> {
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { userId },
    });

    return tokenRecord ? tokenRecord.token : null;
  }

  async updateRefreshToken(
    userId: string,
    newRefreshToken: string
  ): Promise<void> {
    await prisma.refreshToken.update({
      where: { userId },
      data: { token: newRefreshToken },
    });
  }
}
