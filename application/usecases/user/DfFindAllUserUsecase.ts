import { UserRepository } from "@/domain/repositories/UserRepository";
import { FindAllUserDto } from "./dto/FindAllUser";

export class DfFindAllUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<FindAllUserDto[] | null> {
    return await this.userRepository.findAll();
  }
}
