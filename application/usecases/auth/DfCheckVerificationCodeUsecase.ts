import { PrVerificationRepository } from "@/infrastructure/repositories/PrVerificationRepository";

export class DfCheckVerificationCodeUseCase {
  constructor(private verificationRepository: PrVerificationRepository) {}

  async execute(email: string, verificationCode: string): Promise<boolean> {
    const savedCode = await this.verificationRepository.getVerificationCode(
      email
    );
    if (!savedCode) {
      throw new Error("인증코드가 만료되었거나 존재하지 않습니다.");
    }

    const isValid = savedCode === verificationCode;

    if (isValid) {
      await this.verificationRepository.deleteVerificationCode(email);
    }

    return isValid;
  }
}
