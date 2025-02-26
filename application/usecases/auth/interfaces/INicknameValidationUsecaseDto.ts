export interface INicknameValidationRepository {
  isNicknameTaken(nickname: string): Promise<boolean>;
}
