import { User } from "@prisma/client";

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>; // 가입된 사용자가 없는 경우 null 반환
  findByNickname(nickname: string): Promise<User | null>;
  findAll(): Promise<Omit<User, "password">[] | null>;
  createUser(user: User): Promise<void>;
}
