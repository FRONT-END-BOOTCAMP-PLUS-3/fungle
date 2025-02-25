import { UserRepository } from "@/domain/repositories/AuthRepository";
import { RegisterUserDTO } from "./dto/RegisterUserDto";

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: RegisterUserDTO): Promise<void> {
    await this.userRepository.createUser({
      email: dto.email,
      nickname: dto.nickname,
      hashedPassword: dto.hashedPassword,
    });
  }
}
