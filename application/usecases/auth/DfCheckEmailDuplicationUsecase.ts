import { UserRepository } from "@/domain/repositories/UserRepository";

export class DfCheckEmailDuplicationUsecase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  }
}
