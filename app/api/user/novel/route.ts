import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { DfEpisodeByUserIdUsecase } from "@/application/usecases/novel/DfEpisodeByUserIdUsecase";
import { DfNovelByUserIdUsecase } from "@/application/usecases/novel/DfNovelByUserIdUsecase";
import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrNovelEpisodeRepository } from "@/infrastructure/repositories/PrNovelEpisodeRepository";
import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // 로그인 된 사용자인지 검증
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const userRepository: UserRepository = new PrUserRepository();
    const verifyRefreshTokenUsecase = new DfVerifyRefreshToken(userRepository);
    const verifiedUser = await verifyRefreshTokenUsecase.execute(refreshToken);
    const userId = verifiedUser?.id;

    if (!userId) {
      return NextResponse.json({ novels: null }, { status: 400 });
    }

    const novelRepository: NovelRepository = new PrNovelRepository();
    const episodeRepository: NovelEpisodeRepository =
      new PrNovelEpisodeRepository();
    const novelEpisodeByUserIdUsecase = new DfEpisodeByUserIdUsecase(
      episodeRepository
    );
    const novelByUserIdUsecase = new DfNovelByUserIdUsecase(
      novelRepository,
      novelEpisodeByUserIdUsecase
    );

    const novels = await novelByUserIdUsecase.execute(userId);

    if (!novels) {
      return NextResponse.json({ novels: null }, { status: 400 });
    }

    return NextResponse.json({ novels: novels }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "소설 데이터를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
