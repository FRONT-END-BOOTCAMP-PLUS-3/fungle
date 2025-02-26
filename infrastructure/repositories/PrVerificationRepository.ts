import { IVerificationRepository } from "@/domain/repositories/IVerificationRepository";

export class PrVerificationRepository implements IVerificationRepository {
  private verificationCodes: Map<string, string> = new Map(); // 서버 메모리에서 관리

  // async sendVerificationCode(email: string): Promise<string> {
  //   const verificationCode = EmailService.generateVerificationCode();

  //   // ✅ 서버 메모리에 인증 코드 저장 (DB 저장 X)
  //   this.verificationCodes.set(email, verificationCode);

  //   await EmailService.sendVerificationEmail(email, verificationCode);

  //   return verificationCode;
  // }

  async saveVerificationCode(
    email: string,
    code: string,
    expiresIn: number = 300
  ): Promise<void> {
    this.verificationCodes.set(email, code);

    // 인증 코드 만료 시간 설정 (메모리에서 자동 삭제는 구현 필요)
    setTimeout(() => {
      this.verificationCodes.delete(email);
    }, expiresIn * 1000);
  }

  async getVerificationCode(email: string): Promise<string | null> {
    return this.verificationCodes.get(email) || null;
  }

  async deleteVerificationCode(email: string): Promise<void> {
    this.verificationCodes.delete(email);
  }

  async verifyCode(
    email: string,
    code: string,
    expectedCode: string
  ): Promise<boolean> {
    return code === expectedCode; // ✅ 서버에서는 검증만 수행
  }
}
