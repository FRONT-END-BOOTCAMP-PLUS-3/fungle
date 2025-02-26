import { DfNicknameValidationUsecase } from "@/application/usecases/auth/DfNicknameValidation";
import { NextApiRequest, NextApiResponse } from "next";
import { CheckEmailDuplicationUseCase } from "@/application/usecases/auth/DfCheckEmailDuplicationUsecase";
import { ValidationUUseCase } from "@/application/usecases/auth/DfNicknameValidation";
import { HashPasswordUseCase } from "@/application/usecases/auth/DfHashPasswordUsecase";
import { RegisterUserUseCase } from "@/application/usecases/auth/DfRegisterUsecase";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";

const userRepository: UserRepository = new PrUserRepository();

// 회원가입 처리 (POST 요청)
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, nickname, password } = req.body;

  try {
    // 이메일 중복 검사
    const checkEmail = new CheckEmailDuplicationUseCase(userRepository);
    const isEmailAvailable = await checkEmail.execute({ email });
    if (!isEmailAvailable) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }

    // 닉네임 중복 검사
    const checkNickname = new DfNicknameValidationUsecase(userRepository);
    const isNicknameAvailable = await checkNickname.execute(nickname);
    if (!isNicknameAvailable) {
      return res.status(400).json({ message: "이미 존재하는 닉네임입니다." });
    }

    // 비밀번호 해싱
    const hashPassword = new HashPasswordUseCase();
    const hashedPassword = await hashPassword.execute({ password });

    // 사용자 등록
    const registerUser = new RegisterUserUseCase(userRepository);
    await registerUser.execute({ email, nickname, hashedPassword });

    return res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error("회원가입 오류:", error);
    return res.status(500).json({ message: "서버 오류 발생" });
  }
}

// GET 요청 (사용자 목록 조회 등 추가 가능)
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ message: "회원가입 API 입니다." });
}
