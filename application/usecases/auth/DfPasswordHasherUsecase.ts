import bcrypt from "bcrypt";
import { IPasswordHasherUseCase } from "./interfaces/IPasswordHasherUsecase";

export class PasswordHasherUseCase implements IPasswordHasherUseCase {
  private readonly saltRounds = 10;

  async execute(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
}
