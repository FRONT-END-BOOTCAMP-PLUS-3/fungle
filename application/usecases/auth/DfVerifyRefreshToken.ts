import { UserRepository } from "@/domain/repositories/UserRepository";
import { verifyRefreshToken } from "@/utils/auth/jwt";

export class DfVerifyRefreshToken {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string): Promise<{ userId: string } | null> {
    try {
      // 토큰이 유효한지 검증
      const decoded = verifyRefreshToken(token);
      if (!decoded || !decoded.userId) return null;

      // db에 사용자가 존재하는지 검증
      const user = await this.userRepository.getUserById(decoded.userId);
      if (!user) return null;

      return { userId: decoded.userId };
    } catch (error) {
      return null;
    }
  }
}
