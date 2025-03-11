import { UserRepository } from "@/domain/repositories/UserRepository";
import { DfVerifyAccessTokenUsecase } from "./DfVerifyAccessTokenUsecase";
import { cookies } from "next/headers";

export class DfGetUserIdUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly verifyAccessTokenUsecase: DfVerifyAccessTokenUsecase
  ) {}
  async execute(): Promise<string | null> {
    const cookieStore = await cookies();
    // 로그인 된 사용자인지 검증
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) return null;

    const result = await this.verifyAccessTokenUsecase.execute(accessToken);
    if (!result?.verifiedUser) return null;

    return result?.verifiedUser.id;
  }
}
