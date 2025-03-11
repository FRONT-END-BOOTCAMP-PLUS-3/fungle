import { novelDi } from "@/infrastructure/config/novelDi";
import { userDi } from "@/infrastructure/config/userDi"; 
import { NextRequest, NextResponse } from "next/server";


export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const body = await request.json();
  const { comment } = body;

  try {
    const userId = await userDi.getUserIdUsecase.execute(); 
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

    const result = await novelDi.updateCommentUsecase.execute(id, userId, comment);

    return NextResponse.json({ result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Route : episodeId가 없습니다." },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;

  try {
    const userId = await userDi.getUserIdUsecase.execute(); 
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

    const isDeleted = await novelDi.deleteCommentUsecase.execute(id, userId);

    return NextResponse.json({ isDeleted });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Route : Id가 없습니다." },
      { status: 500 }
    );
  }
};
