import { NextRequest, NextResponse } from "next/server";
import { PrVerificationRepository } from "@/infrastructure/repositories/PrVerificationRepository";

// ✅ Next.js API Route를 `POST` 함수로 변경
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
    // ✅ 요청 시마다 새로운 인스턴스 생성
    const verificationRepository = new PrVerificationRepository();

    // 저장된 인증 코드 가져오기
    const savedCode = await verificationRepository.getVerificationCode(email);
    if (!savedCode) {
      return NextResponse.json(
        { message: "인증 코드가 만료되었거나 존재하지 않습니다." },
        { status: 400 }
      );
    }

    // 인증 코드 검증
    if (savedCode !== verificationCode) {
      return NextResponse.json(
        { message: "인증 코드가 일치하지 않습니다." },
        { status: 400 }
      );
    }

    // 인증 코드 사용 후 삭제
    await verificationRepository.deleteVerificationCode(email);

    return NextResponse.json({ message: "인증 성공!" }, { status: 200 });
  } catch (error) {
    console.error("인증 코드 검증 오류:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
