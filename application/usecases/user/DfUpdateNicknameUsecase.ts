import { UserRepository } from "@/domain/repositories/UserRepository";
import { NicknameError } from "./error/NicknameError";

export class DfUpdateNicknameUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, newNickname: string) {
    // 사용자의 현재 닉네임 조회
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NicknameError("UNKNOWN_ERROR", "사용자를 찾을 수 없습니다.");
    }

    // 닉네임이 비어 있으면 기존 닉네임 유지
    if (!newNickname.trim()) {
      return user.nickname;
    }

    // 닉네임 중복 검사
    const isTaken = await this.userRepository.isNicknameTaken(newNickname);
    if (isTaken) {
      throw new NicknameError(
        "DUPLICATE_NICKNAME",
        "이미 사용 중인 닉네임입니다."
      );
    }

    try {
      await this.userRepository.updateNickname(userId, newNickname);
    } catch (error) {
      throw new NicknameError(
        "UNKNOWN_ERROR",
        "닉네임 변경 중 오류가 발생했습니다."
      );
    }
  }
}
