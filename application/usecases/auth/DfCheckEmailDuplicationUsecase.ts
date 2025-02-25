import { UserRepository } from "@/domain/repositories/AuthRepository";
import { CheckEmailDTO } from "./dto/CheckEmailDto";

export class CheckEmailDuplicationUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: CheckEmailDTO): Promise<boolean> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    return existingUser ? false : true;
  }
}
