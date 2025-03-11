export interface IRefreshTokenUsecase {
  execute(
    refreshToken: string
  ): Promise<{ accessToken: string; newRefreshToken: string }>;
}
