import { User } from "@prisma/client";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>; // 가입된 사용자가 없는 경우 null 반환
  findByNickname(nickname: string): Promise<User | null>;
  findAll(): Promise<Omit<User, "password">[] | null>;
  isNicknameTaken(nickname: string): Promise<boolean>;
  createUser(user: User): Promise<void>;
  getUserById(
    userId: string
  ): Promise<Omit<
    User,
    "password" | "userEmail" | "createdAt" | "type"
  > | null>;
  updateNickname(userId: string, newNickname: string): Promise<void>;
  updateIntroduce(userId: string, introduce: string): Promise<void>;
  updateProfileImage(data: {
    userId: string;
    profileImage: string | null;
  }): Promise<void>;
}
