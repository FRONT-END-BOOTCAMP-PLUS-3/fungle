import { NextRequest, NextResponse } from "next/server";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { DfNicknameValidationUsecase } from "@/application/usecases/auth/DfNicknameValidation";

export async function POST(req: NextRequest) {
  try {
    const { nickname } = await req.json();

    if (!nickname) {
      return NextResponse.json(
        { message: "닉네임을 입력해야 합니다." },
        { status: 400 }
      );
    }

    const userRepository = new PrUserRepository();
    const nicknameValidationUseCase = new DfNicknameValidationUsecase(
      userRepository
    );

    const isNicknameAvailable = await nicknameValidationUseCase.execute(
      nickname
    );

    if (!isNicknameAvailable) {
      return NextResponse.json(
        { message: "이미 존재하는 닉네임입니다." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "사용 가능한 닉네임입니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("닉네임 중복 검사 오류:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
