import { NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const GET = async () => {
  try {
    const banners = await novelDi.getBannerNovelsUsecase.execute();
    return NextResponse.json({ banners }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
};
