import { UserRepository } from "@/domain/repositories/AuthRepository";
import { CheckNicknameDTO } from "./dto/CheckNicknameDto";

export class CheckNicknameDuplicationUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: CheckNicknameDTO): Promise<boolean> {
    const existingUser = await this.userRepository.findByNickname(dto.nickname);
    return existingUser ? false : true;
  }
}
