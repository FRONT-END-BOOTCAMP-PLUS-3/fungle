import { UserRepository } from "@/domain/repositories/UserRepository";
import { verifyAccessToken } from "@/utils/auth/jwt";
import { User } from "@prisma/client";
import { DecodedAccessToken } from "./dto/DecodedAccessToken";

export class DfVerifyAccessTokenUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string): Promise<{
    verifiedUser: Omit<User, "userEmail" | "password" | "createdAt"> | null;
    decodedAccessToken: DecodedAccessToken | null;
  } | null> {
    try {
      // 토큰이 유효한지 검증
      const decoded = verifyAccessToken(token);
      if (!decoded || !decoded.userId)
        return { verifiedUser: null, decodedAccessToken: null };

      // db에 사용자가 존재하는지 검증
      const user = await this.userRepository.getUserById(decoded.userId);
      if (!user) return { verifiedUser: null, decodedAccessToken: null };

      return {
        verifiedUser: user,
        decodedAccessToken: { userId: decoded.userId, exp: decoded.exp },
      };
    } catch (error) {
      return null;
    }
  }
}
