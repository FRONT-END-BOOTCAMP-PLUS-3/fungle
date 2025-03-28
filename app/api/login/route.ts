import { LoginRequestDto } from "@/application/usecases/auth/dto/LoginRequestDto";
import { LoginResponseDto } from "@/application/usecases/auth/dto/LoginResponseDto";
import {
  LoginError,
  LoginErrorType,
} from "@/application/usecases/auth/error/LoginError";
import { userDi } from "@/infrastructure/config/userDi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const request: LoginRequestDto = await req.json();

    // 로그인 실행
    const loginResponseDto: LoginResponseDto =
      await userDi.loginUsecase.execute(request);

    const response = NextResponse.json(loginResponseDto, { status: 200 });

    return response;
  } catch (error) {
    console.error("로그인 오류: ", error);

    if (error instanceof LoginError) {
      const errorMapping: Record<
        LoginErrorType,
        { message: string; status: number }
      > = {
        MISSING_CREDENTIALS: {
          message: "이메일과 비밀번호를 모두 입력해주세요.",
          status: 400,
        },
        EMAIL_NOT_FOUND: {
          message: "가입되지 않은 이메일입니다. 회원가입 후 이용해주세요.",
          status: 401,
        },
        INVALID_PASSWORD: {
          message: "비밀번호가 올바르지 않습니다. 다시 시도해주세요.",
          status: 401,
        },

        UNKNOWN_ERROR: {
          message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          status: 500,
        },
      };

      const response =
        errorMapping[error.type] || errorMapping["UNKNOWN_ERROR"];
      return NextResponse.json(
        { error: response.message },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
