import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export async function GET(req: NextRequest, context: { params: Promise<{ novelId: string }> }) { 
  const params = await context.params; 
  const novelId = parseInt(params.novelId, 10);

  if (isNaN(novelId)) {
    return NextResponse.json({ error: "Invalid novel ID" }, { status: 400 });
  }

  try {
    const novel = await novelDi.getNovelByIdUseCase.execute(novelId);
    if (!novel) {
      return NextResponse.json({ error: "Novel not found" }, { status: 404 });
    }

    return NextResponse.json(novel);
  } catch (error) {
    console.error("Error fetching novel:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
