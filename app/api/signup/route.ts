import { NextApiRequest, NextApiResponse } from "next";
import { PrAuthRepository } from "@/infrastructure/repositories/PrAuthRepository";
import { CheckEmailDuplicationUseCase } from "@/application/usecases/auth/DfCheckEmailDuplicationUsecase";
import { CheckNicknameDuplicationUseCase } from "@/application/usecases/auth/DfCheckNicknameDuplicationUsecase";
import { HashPasswordUseCase } from "@/application/usecases/auth/DfHashPasswordUsecase";
import { RegisterUserUseCase } from "@/application/usecases/auth/DfRegisterUsecase";

const authRepository = new PrAuthRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, nickname, password } = req.body;

  try {
    // 이메일 중복 검사
    const checkEmail = new CheckEmailDuplicationUseCase(authRepository);
    const isEmailAvailable = await checkEmail.execute({ email });
    if (!isEmailAvailable) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }

    // 닉네임 중복 검사
    const checkNickname = new CheckNicknameDuplicationUseCase(authRepository);
    const isNicknameAvailable = await checkNickname.execute({ nickname });
    if (!isNicknameAvailable) {
      return res.status(400).json({ message: "이미 존재하는 닉네임입니다." });
    }

    // 비밀번호 해싱
    const hashPassword = new HashPasswordUseCase();
    const hashedPassword = await hashPassword.execute({ password });

    // 사용자 등록
    const registerUser = new RegisterUserUseCase(authRepository);
    await registerUser.execute({ email, nickname, hashedPassword });

    return res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error("회원가입 오류:", error);
    return res.status(500).json({ message: "서버 오류 발생" });
  }
}
