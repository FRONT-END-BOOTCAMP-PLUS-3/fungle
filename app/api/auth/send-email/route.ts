import { PrVerificationRepository } from "@/infrastructure/repositories/PrVerificationRepository";
import { SendEmailUseCase } from "@/application/usecases/auth/DfSendEmailUsecase";
import { DfGenerateVerificationCodeUseCase } from "@/application/usecases/auth/DfGenerateVerifyCodeUsecase";
import { NextRequest, NextResponse } from "next/server";

// ✅ Next.js API Route를 `POST` 함수로 변경
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

    // ✅ 인스턴스 생성 (함수 내부에서 생성하도록 변경)
    const verificationRepository = PrVerificationRepository.getInstance();
    const generateVerificationCodeUseCase =
      new DfGenerateVerificationCodeUseCase();
    const sendEmailUseCase = new SendEmailUseCase(
      generateVerificationCodeUseCase,
      verificationRepository
    );

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
