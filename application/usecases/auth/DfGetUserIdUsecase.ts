import { UserRepository } from "@/domain/repositories/UserRepository";
import { NextRequest } from "next/server";
import { DfVerifyAccessToken } from "./DfVerifyAccessToken";
import { cookies } from "next/headers";

export class DfGetUserIdUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly verifyAccessTokenUsecase: DfVerifyAccessToken
  ) {}
  async execute(): Promise<string | null> {
    const cookieStore = await cookies();
    // 로그인 된 사용자인지 검증
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) return null;

    const verifiedUser = await this.verifyAccessTokenUsecase.execute(
      accessToken
    );
    if (!verifiedUser) return null;

    return verifiedUser?.id;
  }
}
