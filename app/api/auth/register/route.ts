import { NextResponse } from "next/server";
import { PasswordHasherUseCase } from "@/application/usecases/auth/DfPasswordHasherUsecase";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { DfSignupUsecase } from "@/application/usecases/auth/DfSignupUsecase";

export async function POST(request: Request) {
  try {
    const { email, nickname, password } = await request.json();
    const passwordHasher = new PasswordHasherUseCase();
    const userRepository = new PrUserRepository();
    const signUpUseCase = new DfSignupUsecase(userRepository, passwordHasher);

    await signUpUseCase.execute({
      userEmail: email,
      nickname: nickname,
      password: password,
      id: "",
    });

    return NextResponse.json(
      { message: "회원가입 성공! 가입 정보를 업데이트했습니다." },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("회원가입 에러:", error);
    let errorMessage = "서버 에러가 발생했습니다.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
