import { NextRequest, NextResponse } from "next/server";
import { PrVerificationRepository } from "@/infrastructure/repositories/PrVerificationRepository";

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
    const verificationRepository = PrVerificationRepository.getInstance();
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
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
