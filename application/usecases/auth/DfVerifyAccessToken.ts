import { UserRepository } from "@/domain/repositories/UserRepository";
import { verifyAccessToken } from "@/utils/auth/jwt";
import { User } from "@prisma/client";

export class DfVerifyAccessToken {
  constructor(private userRepository: UserRepository) {}

  async execute(
    token: string
  ): Promise<Omit<
    User,
    "userEmail" | "password" | "createdAt" | "type"
  > | null> {
    try {
      // 토큰이 유효한지 검증
      const decoded = verifyAccessToken(token);
      console.log(decoded);
      if (!decoded || !decoded.userId) return null;

      // db에 사용자가 존재하는지 검증
      const user = await this.userRepository.getUserById(decoded.userId);
      if (!user) return null;

      return user;
    } catch (error) {
      return null;
    }
  }
}
