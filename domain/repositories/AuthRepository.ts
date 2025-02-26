export interface AuthRepository {
  generateTokens(
    userId: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
  findRefreshTokenByUserId(userId: string): Promise<string | null>;
  updateRefreshToken(userId: string, newRefreshToken: string): Promise<void>;
}
