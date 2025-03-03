export class PrVerificationRepository {
  private static instance: PrVerificationRepository;
  private verificationCodes: Map<string, string> = new Map();

  private constructor() {}

  public static getInstance(): PrVerificationRepository {
    if (!PrVerificationRepository.instance) {
      PrVerificationRepository.instance = new PrVerificationRepository();
    }
    return PrVerificationRepository.instance;
  }

  async saveVerificationCode(email: string, code: string): Promise<void> {
    this.verificationCodes.set(email, code);
  }

  async getVerificationCode(email: string): Promise<string | null> {
    return this.verificationCodes.get(email) || null;
  }

  async deleteVerificationCode(email: string): Promise<void> {
    this.verificationCodes.delete(email);
  }
}
