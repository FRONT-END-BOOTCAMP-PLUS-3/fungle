import { DfLikedNovelsUsecase } from "@/application/usecases/novel/DfLikedNovelsUsecase";
import { LikedNovelDto } from "@/application/usecases/novel/dto/LikedNovel";
import { NovelLikeRepository } from "@/domain/repositories/NoveLikeRepository";
import { userDi } from "@/infrastructure/config/userDi";
import { PrNovelLikeRepository } from "@/infrastructure/repositories/PrNovelLikeRepository";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();

    if (!userId) {
      return NextResponse.json({ novels: null }, { status: 400 });
    }

    const novelLikeRepository: NovelLikeRepository =
      new PrNovelLikeRepository();
    const likedNovelsUsecase = new DfLikedNovelsUsecase(novelLikeRepository);

    const likedNovels: LikedNovelDto[] = await likedNovelsUsecase.execute(
      userId
    );

    return NextResponse.json({ novels: likedNovels }, { status: 200 });
  } catch {}
};
