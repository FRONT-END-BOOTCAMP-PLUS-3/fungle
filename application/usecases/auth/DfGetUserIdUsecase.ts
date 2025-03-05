import { UserRepository } from "@/domain/repositories/UserRepository";
import { DfVerifyRefreshToken } from "./DfVerifyRefreshToken";
import { NextRequest } from "next/server";

export class DfGetUserIdUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly verifyRefreshTokenUsecase: DfVerifyRefreshToken
  ) {}
  async execute(req: NextRequest): Promise<string | null> {
    // 로그인 된 사용자인지 검증
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) return null;

    const verifiedUser = await this.verifyRefreshTokenUsecase.execute(
      refreshToken
    );
    if (!verifiedUser) return null;

    return verifiedUser?.id;
  }
}
