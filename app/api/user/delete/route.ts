import { DfFundingUsecase } from "@/application/usecases/funding/DfFundingUsecase";
import { DfEpisodeByUserIdUsecase } from "@/application/usecases/novel/DfEpisodeByUserIdUsecase";
import { DfNovelByUserIdUsecase } from "@/application/usecases/novel/DfNovelByUserIdUsecase";
import { DfDeleteUserUsecase } from "@/application/usecases/user/DfDeleteUserUsecase";
import { FundingRepository } from "@/domain/repositories/FundingRepository";
import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { userDi } from "@/infrastructure/config/userDi";
import { PrFundingRepository } from "@/infrastructure/repositories/PrFundingRepository";
import { PrNovelEpisodeRepository } from "@/infrastructure/repositories/PrNovelEpisodeRepository";
import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { FileService } from "@/infrastructure/services/FileService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const userId = await userDi.getUserIdUsecase.execute();

  if (!userId) {
    return NextResponse.json(
      { error: "로그인 되어 있지 않습니다." },
      { status: 401 }
    );
  }

  const fileService = new FileService();

  const userRepository: UserRepository = new PrUserRepository();
  const novelRepository: NovelRepository = new PrNovelRepository();
  const novelEpisodeRepository: NovelEpisodeRepository =
    new PrNovelEpisodeRepository();
  const fundingRepository: FundingRepository = new PrFundingRepository();

  const episodesByUserIdUsecase = new DfEpisodeByUserIdUsecase(
    novelEpisodeRepository
  );
  const novelByUserIdUsecase = new DfNovelByUserIdUsecase(
    novelRepository,
    episodesByUserIdUsecase
  );
  const fundingUsecase = new DfFundingUsecase(fundingRepository);
  const deleteUserUsecase = new DfDeleteUserUsecase(
    userRepository,
    novelByUserIdUsecase,
    fileService,
    fundingUsecase
  );

  const isSuccess = await deleteUserUsecase.execute(userId);

  if (!isSuccess)
    return NextResponse.json(
      {
        error: "진행 중인 펀딩이 있는 경우 회원 탈퇴가 불가능합니다.",
      },
      { status: 400 }
    );

  const cookieStore = await cookies();

  cookieStore.set("accessToken", "", { maxAge: 0, path: "/" });
  cookieStore.set("refreshToken", "", { maxAge: 0, path: "/" });

  return NextResponse.json(
    { message: "회원 탈퇴가 완료되었습니다." },
    { status: 200 }
  );
};
