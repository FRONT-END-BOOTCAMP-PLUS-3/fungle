export interface AuthRepository {
  generateTokens(
    userId: string,
    type: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
  findRefreshTokenByUserId(userId: string): Promise<string | null>;
  updateRefreshToken(userId: string, newRefreshToken: string): Promise<void>;
  deleteRefreshToken(refreshToken: string): Promise<void>;
}
