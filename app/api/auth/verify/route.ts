import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const userRepository: UserRepository = new PrUserRepository();
  const verifyRefreshTokenUsecase = new DfVerifyRefreshToken(userRepository);
  const verifiedUser = await verifyRefreshTokenUsecase.execute(refreshToken);

  if (!verifiedUser) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: verifiedUser });
}
