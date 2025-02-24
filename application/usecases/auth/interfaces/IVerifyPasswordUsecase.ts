// 비밀번호 검증 usecase interface
export interface IVerifyPasswordUsecase {
  execute(userId: string, password: string): Promise<boolean>;
}
