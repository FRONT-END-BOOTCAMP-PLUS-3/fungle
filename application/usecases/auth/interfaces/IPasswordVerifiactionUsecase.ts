// 비밀번호 비교 usecase interface(boolean 값 반환)
export interface IPasswordVerifiactionUsecase {
  execute(password: string, hashedPassword: string): Promise<boolean>;
}
