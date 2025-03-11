export interface IPasswordHasherUseCase {
    execute(password: string): Promise<string>;
  }