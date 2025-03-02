import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const genres = JSON.parse(formData.get("genres") as string) as string[];
    const serialDay = formData.get("serialDay") as string;
    const userId = formData.get("userId") as string;
    const coverImage = formData.get("coverImage") as File | null;

    const novel = await novelDi.createNovelUseCase.execute({
      title,
      description,
      serialDay,
      userId,
      genres,
      coverImage,
    });

    return NextResponse.json({ message: "소설이 성공적으로 생성되었습니다.", novelId: novel.id }, { status: 201 });
  } catch (error) {
    console.error("소설 생성 오류:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
};