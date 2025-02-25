import bcrypt from "bcrypt";
import { HashPasswordDTO } from "./dto/HashPasswordDto";

export class HashPasswordUseCase {
  private static saltRounds = 10;

  async execute(dto: HashPasswordDTO): Promise<string> {
    return bcrypt.hash(dto.password, HashPasswordUseCase.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
