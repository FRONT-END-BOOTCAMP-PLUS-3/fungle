export interface INicknameValidationUsecase {
  execute(nickname: string): Promise<boolean>;
}
