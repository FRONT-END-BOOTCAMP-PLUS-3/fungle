import { IPasswordVerifiactionUsecase } from "./interfaces/IPasswordVerifiactionUsecase";
import bcrypt from "bcrypt";

// 비밀번호 비교 usecase(boolean 값 반환)
export class DfPasswordVerificationUsecase
  implements IPasswordVerifiactionUsecase
{
  async execute(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
