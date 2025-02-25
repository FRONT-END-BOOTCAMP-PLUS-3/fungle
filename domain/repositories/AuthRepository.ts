import { user } from "@prisma/client";

export interface AuthRepository {
  findByEmail(email: string): Promise<user | null>;
  findByNickname(nickname: string): Promise<user | null>;
  createUser(user: user): Promise<void>;
}
