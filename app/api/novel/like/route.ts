import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { ToggleNovelLikeUsecase } from "@/application/usecases/novel/DfToggleNovelLikeUsecase";
import { PrNovelLikeRepository } from "@/infrastructure/repositories/PrNovelLikeRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { novelId } = body;

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const userRepository = new PrUserRepository();
    const verifyRefreshTokenUsecase = new DfVerifyRefreshToken(userRepository);
    const verifiedUser = await verifyRefreshTokenUsecase.execute(refreshToken);

    if (!verifiedUser) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

    const { id: userId } = verifiedUser;

    const novelLikeRepository = new PrNovelLikeRepository();
    const toggleLikeUsecase = new ToggleNovelLikeUsecase(novelLikeRepository);
    const result = await toggleLikeUsecase.execute(novelId, userId);

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Route error" }, { status: 500 });
  }
};
