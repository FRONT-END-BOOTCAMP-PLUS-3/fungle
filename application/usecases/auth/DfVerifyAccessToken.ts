import { UserRepository } from "@/domain/repositories/UserRepository";
import { verifyAccessToken } from "@/utils/auth/jwt";

export class DfVerifyAccessToken {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string): Promise<{ userId: string } | null> {
    try {
      // 토큰이 유효한지 검증
      const decoded = verifyAccessToken(token);
      if (!decoded || !decoded.id) return null;

      // db에 사용자가 존재하는지 검증
      const user = await this.userRepository.getUserById(decoded.id);
      if (!user) return null;

      return { userId: decoded.id };
    } catch (error) {
      return null;
    }
  }
}
