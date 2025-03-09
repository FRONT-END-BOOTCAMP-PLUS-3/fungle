import { UserRepository } from "@/domain/repositories/UserRepository";

export class DfDeleteUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    await this.userRepository.deleteUser(userId);
  }
}
