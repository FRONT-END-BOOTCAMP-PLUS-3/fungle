import { novelDi } from "@/infrastructure/config/novelDi";
import { userDi } from "@/infrastructure/config/userDi"; // ✅ userDi 유지
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;

  try {
    const userId = await userDi.getUserIdUsecase.execute(); // ✅ userDi 유지
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

    const isLiked = await novelDi.toggleCommentLikeUseCase.execute(id, userId);

    return NextResponse.json({ isLiked });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to like comment" },
      { status: 500 }
    );
  }
};
