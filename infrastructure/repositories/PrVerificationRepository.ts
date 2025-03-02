export class PrVerificationRepository {
  private static instance: PrVerificationRepository;
  private verificationCodes: Map<string, string> = new Map();

  private constructor() {} // ❌ 외부에서 new 인스턴스를 생성하지 못하도록 private 생성자

  public static getInstance(): PrVerificationRepository {
    if (!PrVerificationRepository.instance) {
      PrVerificationRepository.instance = new PrVerificationRepository();
    }
    return PrVerificationRepository.instance;
  }

  async saveVerificationCode(email: string, code: string): Promise<void> {
    this.verificationCodes.set(email, code);
    console.log(`✅ 인증 코드 저장 완료 (${email}): ${code}`);
  }

  async getVerificationCode(email: string): Promise<string | null> {
    console.log(
      `🔍 인증 코드 조회 요청 (${email}):`,
      this.verificationCodes.get(email)
    );
    return this.verificationCodes.get(email) || null;
  }

  async deleteVerificationCode(email: string): Promise<void> {
    this.verificationCodes.delete(email);
    console.log(`🗑️ 인증 코드 삭제 완료 (${email})`);
  }
}
