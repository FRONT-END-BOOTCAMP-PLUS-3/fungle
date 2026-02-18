import { adminDi } from "@/infrastructure/config/adminDi";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const users = await adminDi.findAllUserWithFundingStatusUsecase.execute();
    return NextResponse.json({ users: users ?? [] }, { status: 200 });
  } catch {
    return NextResponse.json({ users: [] }, { status: 200 });
  }
};
