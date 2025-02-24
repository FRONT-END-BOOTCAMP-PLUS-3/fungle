import { User } from "@/domain/entities/user";

export class UserDTO {
  constructor(
    public id: string,
    public nickname: string,
    public userEmail: string,
    public introduce: string | null,
    public createdAt: Date,
    public type: string
  ) {}


  static fromEntity(entity: User): UserDTO {
    return new UserDTO(
      entity.id,
      entity.nickname,
      entity.userEmail,
      entity.introduce, 
      entity.createdAt,
      entity.type
    );
  }
}
