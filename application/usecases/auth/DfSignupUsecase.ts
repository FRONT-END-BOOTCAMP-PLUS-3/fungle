import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { SignUpRequestDTO } from "./dto/SignupRequestDto";
import { IPasswordHasherUseCase } from "./interfaces/IPasswordHasherUsecase";

export class SignUpUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordHasherUseCase: IPasswordHasherUseCase
  ) {}

  async execute(request: SignUpRequestDTO): Promise<void> {
    // 비밀번호 해싱
    const hashedPassword = await this.passwordHasherUseCase.execute(
      request.password
    );

    // UUID 자동 생성 (Prisma에서 자동 할당)
    await this.authRepository.createUser({
      id: request.id,
      nickname: request.nickname,
      userEmail: request.userEmail,
      password: hashedPassword,
      createdAt: new Date(),
      type: "",
      introduce: "",
    });
  }
}
