import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/utils/auth/jwt";
import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { IRefreshTokenUsecase } from "./interfaces/IRefreshTokenUsecase";

const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export class DfRefreshTokenUsecase implements IRefreshTokenUsecase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(
    refreshToken: string
  ): Promise<{ accessToken: string; newRefreshToken: string }> {
    // refresh token이 유효한지 검증
    const decoded = verifyRefreshToken(REFRESH_SECRET);
    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      throw new Error("유효하지 않은 토큰입니다.");
    }

    // db에 저장된 refresh token 조회
    const storedToken = await this.authRepository.findRefreshTokenByUserId(
      decoded.id
    );

    if (!storedToken || storedToken !== refreshToken) {
      throw new Error("토큰이 존재하지 않습니다.");
    }

    // 새로운 access token 발급
    const newAccessToken = generateAccessToken(decoded.userId);
    // 새로운 refresh token 발급
    const newRefreshToken = generateRefreshToken(decoded.userId);

    // 새로운 refresh token으로 업데이트
    await this.authRepository.updateRefreshToken(decoded.id, newRefreshToken);

    return { accessToken: newAccessToken, newRefreshToken };
  }
}
