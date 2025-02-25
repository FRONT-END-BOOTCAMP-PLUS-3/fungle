export class RegisterUserDTO {
  constructor(
    public email: string,
    public nickname: string,
    public hashedPassword: string
  ) {}
}
