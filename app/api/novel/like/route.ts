import { ToggleNovelLikeUsecase } from "@/application/usecases/novel/DfToggleNovelLikeUsecase";
import { userDi } from "@/infrastructure/config/userDi";
import { PrNovelLikeRepository } from "@/infrastructure/repositories/PrNovelLikeRepository";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { novelId } = body;

    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

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
