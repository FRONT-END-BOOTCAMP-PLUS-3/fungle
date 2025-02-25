import { user } from "@prisma/client";

export interface AuthRepository {
  findByEmail(email: string): Promise<user | null>; // 가입된 사용자가 없는 경우 null 반환
  findByNickname(nickname: string): Promise<user | null>;
  createUser(user: user): Promise<void>;
}
