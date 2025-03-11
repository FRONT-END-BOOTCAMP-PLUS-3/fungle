import { NextRequest, NextResponse } from "next/server";
import { IMVerificationRepository } from "@/infrastructure/repositories/IMVerificationRepository";

export async function POST(req: NextRequest) {
  const request = await req.json();
  const { email, verificationCode } = request;

  if (!email || !verificationCode) {
    return NextResponse.json(
      { message: "이메일과 인증 코드를 입력해야 합니다." },
      { status: 400 }
    );
  }

  try {
    const verificationRepository = IMVerificationRepository.getInstance();
    const savedCode = await verificationRepository.getVerificationCode(email);

    if (!savedCode) {
      return NextResponse.json(
        { message: "인증 코드가 존재하지 않거나 만료되었습니다." },
        { status: 400 }
      );
    }

    if (savedCode.trim() !== verificationCode.trim()) {
      return NextResponse.json(
        { message: "인증 코드가 일치하지 않습니다." },
        { status: 400 }
      );
    }

    await verificationRepository.deleteVerificationCode(email);
    return NextResponse.json({ message: "인증 성공!" }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "서버 오류 발생";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
