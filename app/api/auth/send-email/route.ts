import { DfCheckEmailDuplicationUsecase } from "@/application/usecases/auth/DfCheckEmailDuplicationUsecase";
import { IMVerificationRepository } from "@/infrastructure/repositories/IMVerificationRepository";
import { SendEmailUseCase } from "@/application/usecases/auth/DfSendEmailUsecase";
import { DfGenerateVerificationCodeUseCase } from "@/application/usecases/auth/DfGenerateVerifyCodeUsecase";
import { NextRequest, NextResponse } from "next/server";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";

export async function POST(req: NextRequest) {
  const request = await req.json();
  if (!request) {
    return NextResponse.json(
      { message: "이메일을 입력해야 합니다." },
      { status: 400 }
    );
  }

  try {
    const { email } = request;

    const verificationRepository = IMVerificationRepository.getInstance();
    const generateVerificationCodeUseCase =
      new DfGenerateVerificationCodeUseCase();
    const sendEmailUseCase = new SendEmailUseCase(
      generateVerificationCodeUseCase,
      verificationRepository
    );

    const userRepository: UserRepository = new PrUserRepository();
    const checkEmailDuplicationUseCase = new DfCheckEmailDuplicationUsecase(
      userRepository
    );

    // 이메일 중복 검사
    const isDuplicate = await checkEmailDuplicationUseCase.execute(email);
    if (isDuplicate) {
      return NextResponse.json(
        { message: "이미 가입된 이메일입니다." },
        { status: 400 }
      );
    }

    // 이메일 전송 실행
    await sendEmailUseCase.execute(email);

    return NextResponse.json(
      { message: "이메일이 성공적으로 전송되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("이메일 전송 오류:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
