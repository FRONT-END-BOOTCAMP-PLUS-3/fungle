import { NovelEpisodeWithUserInfo } from "@/application/usecases/novel/dto/NovelEpisodeWithUserInfo";
import { adminDi } from "@/infrastructure/config/adminDi";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data: NovelEpisodeWithUserInfo[] =
      await adminDi.novelEpisodeWithUserInfoUsecase.execute();
    return NextResponse.json({ success: true, data: data ?? [] }, { status: 200 });
  } catch {
    return NextResponse.json({ success: true, data: [] }, { status: 200 });
  }
};
