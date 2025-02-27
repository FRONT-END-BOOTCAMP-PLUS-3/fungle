import { NextResponse } from "next/server";

export interface ISetAuthCookieUsecase {
  execute(response: NextResponse, refreshToken: string): NextResponse;
}
