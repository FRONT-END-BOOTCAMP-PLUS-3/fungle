import { NovelsByUserIdDto } from "@/application/usecases/novel/dto/NovelsByUserId";
import { userDi } from "@/infrastructure/config/userDi";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();

    if (!userId) {
      return NextResponse.json(
        { novels: null, error: "로그인 되어 있지 않습니다." },
        { status: 401 }
      );
    }

    const novels: NovelsByUserIdDto[] | null =
      await userDi.getNovelByUserIdUsecase.execute(userId);

    if (!novels) {
      return NextResponse.json({ novels: null }, { status: 400 });
    }

    const novelsWithFunding = await Promise.all(
      novels.map(async (novel) => {
        const funding = await userDi.getFundingByUserIdUsecase.execute(
          novel.id
        );
        return {
          ...novel,
          hasActiveFunding: funding?.hasActiveFunding ?? false,
        };
      })
    );

    return NextResponse.json({ novels: novelsWithFunding }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "소설 데이터를 가져오는 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "로그인 되어 있지 않습니다." },
        { status: 401 }
      );
    }

    const { novelId } = await req.json();
    if (!novelId) {
      return NextResponse.json(
        { error: "소설 ID가 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    const result = await userDi.deleteNovelByNovelIdUsecase.execute(novelId);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "소설 삭제 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "로그인 되어 있지 않습니다." },
        { status: 401 }
      );
    }

    const { novelId, status } = await req.json();
    if (!novelId || !status) {
      return NextResponse.json(
        {
          error:
            !novelId && !status
              ? "소설 ID와 연재 상태 값이 제공되지 않았습니다."
              : !novelId
              ? "소설 ID가 제공되지 않았습니다."
              : "연재 상태 값이 제공되지 않았습니다.",
        },
        { status: 400 }
      );
    }

    const result = await userDi.updateNovelSerialStatusByNovelIdUsecase.execute(
      novelId,
      status
    );

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "소설 연재 상태 변경 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
};
