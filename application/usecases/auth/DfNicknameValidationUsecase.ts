import { UserRepository } from "@/domain/repositories/UserRepository";
import { INicknameValidationUsecase } from "./interfaces/INicknameValidationUsecase";

export class DfNicknameValidationUsecase implements INicknameValidationUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(nickname: string): Promise<boolean> {
    if (!nickname) {
      throw new Error("닉네임을 입력해야 합니다.");
    }

    const isTaken = await this.userRepository.isNicknameTaken(nickname);

    return !isTaken; // ❌ 중복 닉네임이면 false 반환
  }
}
