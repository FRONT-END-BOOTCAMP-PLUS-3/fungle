import { LoginRequestDto } from "./dto/LoginRequestDto";
import { LoginResponseDto } from "./dto/LoginResponseDto";
import { IPasswordVerifiactionUsecase } from "./interfaces/IPasswordVerifiactionUsecase";
import { LoginError } from "./error/LoginError";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class LoginUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordVerificationUsecase: IPasswordVerifiactionUsecase
  ) {}
  async execute(request: LoginRequestDto): Promise<LoginResponseDto> {
    if (!request.userEmail?.trim() || !request.password?.trim()) {
      throw new LoginError(
        "MISSING_CREDENTIALS",
        "이메일과 비밀번호를 모두 입력해주세요."
      );
    }

    const userData = await this.userRepository.findByEmail(request.userEmail);

    if (!userData) {
      throw new LoginError("EMAIL_NOT_FOUND", "가입되지 않은 이메일입니다.");
    }

    const { userEmail, password } = userData;

    // 비밀번호 비교
    const isValidPassword: boolean =
      await this.passwordVerificationUsecase.execute(
        request.password,
        password
      );

    if (!isValidPassword) {
      throw new LoginError("INVALID_PASSWORD", "비밀번호가 올바르지 않습니다.");
    }

    return { userEmail };
  }
}
