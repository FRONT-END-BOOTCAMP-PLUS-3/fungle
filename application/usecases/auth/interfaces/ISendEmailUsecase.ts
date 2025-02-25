export interface ISendEmailUseCase {
  execute(to: string, verificationCode: string): Promise<void>;
}
