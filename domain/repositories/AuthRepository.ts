export interface AuthRepository {
  generateTokens(
    userId: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
