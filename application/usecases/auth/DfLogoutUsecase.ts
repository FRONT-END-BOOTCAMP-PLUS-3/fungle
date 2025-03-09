import { AuthRepository } from "@/domain/repositories/AuthRepository";

export class DfLogoutUsecase {
  constructor(private authRepository: AuthRepository) {}

  async execute(refreshToken: string) {
    await this.authRepository.deleteRefreshToken(refreshToken);
  }
}
