export interface AuthRepository {
  generateTokens(
    userId: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
  verifyAccessToken(token: string): Promise<{ userId: string } | null>;
  findRefreshTokenByUserId(userId: string): Promise<string | null>;
  updateRefreshToken(userId: string, newRefreshToken: string): Promise<void>;
}
