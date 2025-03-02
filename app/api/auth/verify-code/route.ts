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

    console.log("🔍 요청된 이메일:", email);

    // 저장된 인증 코드 가져오기
    const savedCode = await verificationRepository.getVerificationCode(email);
    console.log("📌 서버에 저장된 인증 코드:", savedCode);

    // 🔴 서버에서 가져온 값이 `null`이면 인증 코드가 저장되지 않았다는 의미
    if (!savedCode) {
      return NextResponse.json(
        { message: "인증 코드가 존재하지 않거나 만료되었습니다." },
        { status: 400 }
      );
    }

    // 🔥 인증 코드 비교 (공백 제거 & 대소문자 구분 X)
    if (savedCode.trim() !== verificationCode.trim()) {
      return NextResponse.json(
        { message: "인증 코드가 일치하지 않습니다." },
        { status: 400 }
      );
    }

    // 인증 성공 → 인증 코드 삭제
    await verificationRepository.deleteVerificationCode(email);
    console.log(`✅ 인증 성공! ${email}의 인증 코드 삭제`);

    return NextResponse.json({ message: "인증 성공!" }, { status: 200 });
  } catch (error) {
    console.error("❌ 인증 코드 검증 오류:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
