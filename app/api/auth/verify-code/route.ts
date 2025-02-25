import { NextApiRequest, NextApiResponse } from "next";
import { PrVerificationRepository } from "@/infrastructure/repositories/PrVerificationRepository";

// ✅ 인스턴스 생성
const verificationRepository = new PrVerificationRepository();

// ✅ Next.js API Route를 `POST` 함수로 변경
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res
      .status(400)
      .json({ message: "이메일과 인증 코드를 입력해야 합니다." });
  }

  try {
    // 저장된 인증 코드 가져오기
    const savedCode = await verificationRepository.getVerificationCode(email);
    if (!savedCode) {
      return res
        .status(400)
        .json({ message: "인증 코드가 만료되었거나 존재하지 않습니다." });
    }

    // 인증 코드 검증
    if (savedCode !== verificationCode) {
      return res
        .status(400)
        .json({ message: "인증 코드가 일치하지 않습니다." });
    }

    // 인증 코드 사용 후 삭제
    await verificationRepository.deleteVerificationCode(email);

    return res.status(200).json({ message: "인증 성공!" });
  } catch (error) {
    console.error("인증 코드 검증 오류:", error);
    return res.status(500).json({ message: "서버 오류 발생" });
  }
}
