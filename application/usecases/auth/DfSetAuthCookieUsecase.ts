import { NextResponse } from "next/server";
import { ISetAuthCookieUsecase } from "./interfaces/ISetAuthCookieUsecase";

export class DfSetAuthCookieUsecase implements ISetAuthCookieUsecase {
  execute(response: NextResponse, refreshToken: string): NextResponse {
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  }
}
