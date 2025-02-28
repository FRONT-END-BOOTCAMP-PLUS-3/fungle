import { DfVerifyAccessToken } from "@/application/usecases/auth/DfVerifyAccessToken";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const userRepository: UserRepository = new PrUserRepository();
  const verifyAccessTokenUseCase = new DfVerifyAccessToken(userRepository);
  const verifiedUser = await verifyAccessTokenUseCase.execute(accessToken);

  if (!verifiedUser) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: verifiedUser });
}
