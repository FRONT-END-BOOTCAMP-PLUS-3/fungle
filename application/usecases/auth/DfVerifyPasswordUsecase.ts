// 비밀번호 검증 usecase interface
import { UserRepository } from "@/domain/repositories/UserRepository";
import { IPasswordVerifiactionUsecase } from "./interfaces/IPasswordVerifiactionUsecase";

export class VerifyPasswordUsecase implements IPasswordVerifiactionUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordVerificationUsecase: IPasswordVerifiactionUsecase
  ) {}

  async execute(email: string, password: string): Promise<boolean> {
    const userData = await this.userRepository.findByEmail(email);
    const hashedPassword = userData?.password;

    if (!hashedPassword) throw new Error("비밀번호가 존재하지 않습니다.");

    // 비밀번호 검증
    const isPasswordValid = await this.passwordVerificationUsecase.execute(
      password,
      hashedPassword
    );

    return isPasswordValid;
  }
}
