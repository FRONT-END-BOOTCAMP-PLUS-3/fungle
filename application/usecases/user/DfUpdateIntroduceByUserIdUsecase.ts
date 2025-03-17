import { UserRepository } from "@/domain/repositories/UserRepository";

export class DfUpdateIntroduceByUserIdUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, introduce: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    if (introduce.length > 200) {
      throw new Error("소개글은 최대 200자까지 작성 가능합니다.");
    }

    await this.userRepository.updateIntroduce(userId, introduce);
  }
}
