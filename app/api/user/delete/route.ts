import { DfEpisodeByUserIdUsecase } from "@/application/usecases/novel/DfEpisodeByUserIdUsecase";
import { DfNovelByUserIdUsecase } from "@/application/usecases/novel/DfNovelByUserIdUsecase";
import { DfDeleteUserUsecase } from "@/application/usecases/user/DfDeleteUserUsecase";
import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { userDi } from "@/infrastructure/config/userDi";
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

  const userRepository: UserRepository = new PrUserRepository();
  const fileService = new FileService();
  const novelRepository: NovelRepository = new PrNovelRepository();
  const novelEpisodeRepository: NovelEpisodeRepository =
    new PrNovelEpisodeRepository();

  const episodesByUserIdUsecase = new DfEpisodeByUserIdUsecase(
    novelEpisodeRepository
  );
  const novelByUserIdUsecase = new DfNovelByUserIdUsecase(
    novelRepository,
    episodesByUserIdUsecase
  );
  const deleteUserUsecase = new DfDeleteUserUsecase(
    userRepository,
    novelByUserIdUsecase,
    fileService
  );

  await deleteUserUsecase.execute(userId);

  const cookieStore = await cookies();

  const response = NextResponse.json(
    {
      message: "회원 탈퇴가 완료되었습니다.",
    },
    { status: 200 }
  );
  cookieStore.set("accessToken", "", { maxAge: 0, path: "/" });
  cookieStore.set("refreshToken", "", { maxAge: 0, path: "/" });

  return response;
};
