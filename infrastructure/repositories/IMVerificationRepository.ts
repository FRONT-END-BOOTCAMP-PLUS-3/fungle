export class IMVerificationRepository {
  private static instance: IMVerificationRepository;
  private verificationCodes: Map<string, string> = new Map();

  private constructor() {}

  public static getInstance(): IMVerificationRepository {
    if (!IMVerificationRepository.instance) {
      IMVerificationRepository.instance = new IMVerificationRepository();
    }
    return IMVerificationRepository.instance;
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
