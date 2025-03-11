import { NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const GET = async () => {
  try {
    const topNovels = await novelDi.getTopNovelsUseCase.execute(10);

    return NextResponse.json(topNovels, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
};
